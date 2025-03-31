import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Post, Req, Sse, UseGuards } from '@nestjs/common';
import { AIChatSessionService } from './ai-chat-session.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { JwtPayLoad } from '@/auth/type';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { CreateSessionVo } from './vo/create-session-vo';
import { GetSessionsVo } from './vo/get-sessions-vo';
import { PostMessageDto } from './dto/post-message.dto';
import { UserJWT } from '@/decorator';
import { AIChatMessageService } from '@/ai-chat-message/ai-chat-message.service';
import { GetMessagesDto } from '@/ai-chat-message/dto/get-messages.dto';
import { GetMessagesVo } from '@/ai-chat-message/vo/get-messages.vo';
import { OpenAIService } from '@/openai/openai.service';
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources';
import { AIChatMessageSender } from '@/ai-chat-message/ai-chat-message.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observer } from 'rxjs';

@Controller('ai-chat-session')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AIChatSessionController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private aiChatSessionService: AIChatSessionService,
    private aiChatMessageService: AIChatMessageService,
    private openAIService: OpenAIService
  ) {}

  @Post('session')
  @ApiOkResponse({ type: CreateSessionVo })
  async createSession(@Body() dto: CreateSessionDto, @UserJWT() user: JwtPayLoad): Promise<CreateSessionVo> {
    const userId = user.userId;

    const title = await this.openAIService.generateTitle(dto.initialMessage);
    const session = await this.aiChatSessionService.save({ modelName: dto.modelName, user: { id: userId }, title });
    const vo = new CreateSessionVo();
    vo.sessionId = session.id;
    return vo;
  }

  @Get('sessions')
  @ApiOkResponse({ type: GetSessionsVo })
  async getSessions(@UserJWT() user: JwtPayLoad): Promise<GetSessionsVo> {
    const userId = user.userId;
    const sessions = await this.aiChatSessionService.findAllByUserId(userId);

    const vo = new GetSessionsVo();
    vo.sessions = sessions.map((s) => ({
      id: s.id,
      modelName: s.modelName,
    }));
    return vo;
  }

  @Delete('session/:id')
  async removeSession(@Param('id') sessionId: number, @UserJWT() user: JwtPayLoad) {
    const session = await this.aiChatSessionService.verifySessionOwnership(user.userId, sessionId);
    await this.aiChatSessionService.remove(sessionId);
    return;
  }

  @Sse('session/:id/chat')
  @ApiOperation({
    summary: '订阅ai消息流 (SSE)',
    description: '返回消息流',
  })
  @ApiProduces('text/event-stream')
  async postMessage(@Param('id') sessionId: number, @Body() dto: PostMessageDto, @UserJWT() user: JwtPayLoad) {
    const session = await this.aiChatSessionService.verifySessionOwnership(user.userId, sessionId);
    const history: { message: string; sender: AIChatMessageSender }[] = await this.aiChatMessageService.findMessagesBySessionIdWithPagination(
      session,
      0,
      10
    );
    history.push({
      sender: AIChatMessageSender.USER,
      message: dto.message,
    });
    const messages: ChatCompletionMessageParam[] = history.map((msg) => {
      switch (msg.sender) {
        case AIChatMessageSender.USER: {
          const res: ChatCompletionUserMessageParam = {
            role: 'user',
            content: msg.message,
          };
          return res;
        }
        case AIChatMessageSender.AI: {
          const res: ChatCompletionAssistantMessageParam = {
            role: 'assistant',
            content: msg.message,
          };
          return res;
        }
        case AIChatMessageSender.SYSTEM: {
          const res: ChatCompletionSystemMessageParam = {
            role: 'system',
            content: msg.message,
          };
          return res;
        }
      }
    });

    // 保存用户输入信息
    await this.aiChatMessageService.save({
      sessionId,
      message: dto.message,
      sender: AIChatMessageSender.USER,
    });
    const response = await this.openAIService.chatStream(messages);

    let buffer = '';
    const completionObserver: Observer<any> = {
      next: (chunk) => {
        buffer += chunk.data;
      },
      error: (err) => {
        this.logger.error(err);
      },
      complete: () => {
        void (async () => {
          const aiChatMessage = await this.aiChatMessageService.save({
            sessionId,
            message: buffer,
            sender: AIChatMessageSender.SYSTEM,
          });
        })();
      },
    };

    response.subscribe(completionObserver);

    return response;
  }

  @Get('session/:id/chat')
  async getHistoryMessage(@Param('id') sessionId: number, @Body() dto: GetMessagesDto, @UserJWT() user: JwtPayLoad): Promise<GetMessagesVo> {
    const session = await this.aiChatSessionService.verifySessionOwnership(user.userId, sessionId);
    const res = await this.aiChatMessageService.findMessagesBySessionIdWithPagination(session, dto.page, dto.limit);

    const vo = new GetMessagesVo();
    vo.messages = res.map((a) => ({
      sender: a.sender,
      message: a.message,
    }));

    return vo;
  }
}
