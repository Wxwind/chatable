import { Body, Controller, Delete, Get, Param, Post, Req, Sse, UseGuards } from '@nestjs/common';
import { AIChatSessionService } from './ai-chat-session.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateSessionDto } from './dto/create-session-dto';
import { RequestWithAuth } from '@/auth/type';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { CreateSessionVo } from './vo/create-session-vo';
import { GetSessionsVo } from './vo/get-sessions-vo';
import { ApiException } from '@/common/apiException';
import { ErrorCode } from '@/common/api/errorCode';
import { PostMessageDto } from './dto/post-message.dto';

@Controller('ai-chat-session')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AIChatSessionController {
  constructor(private aiChatSessionService: AIChatSessionService) {}

  @Post('session')
  @ApiOkResponse({ type: CreateSessionVo })
  async createSession(@Body() dto: CreateSessionDto, @Req() request: RequestWithAuth): Promise<CreateSessionVo> {
    const userId = request.user.userId;
    const session = await this.aiChatSessionService.save({ modelName: dto.modelName, userId });

    const vo = new CreateSessionVo();
    vo.sessionId = session.id;
    return vo;
  }

  @Get('sessions')
  @ApiOkResponse({ type: GetSessionsVo })
  async getSessions(@Req() request: RequestWithAuth): Promise<GetSessionsVo> {
    const userId = request.user.userId;
    const sessions = await this.aiChatSessionService.findAllByUserId(userId);

    const vo = new GetSessionsVo();
    vo.sessions = sessions.map((s) => ({
      id: s.id,
      modelName: s.modelName,
    }));
    return vo;
  }

  @Delete('session/:id')
  async removeSession(@Param('id') sessionId: number, @Req() request: RequestWithAuth) {
    const userId = request.user.userId;
    const session = await this.aiChatSessionService.findOne(sessionId);
    if (!session) {
      throw new ApiException(ErrorCode.SESSION_NOT_FOUND);
    }
    if (session.user.id !== userId) {
      throw new ApiException(ErrorCode.SESSION_ID_ILLEGAL);
    }
    await this.aiChatSessionService.remove(sessionId);
    return;
  }

  @Post('session/:id/chat')
  @Sse()
  @ApiOperation({
    summary: '订阅ai消息流 (SSE)',
    description: '返回消息流',
  })
  @ApiProduces('text/event-stream')
  async postMessage(@Param('id') sessionId: number, @Body() dto: PostMessageDto, @Req() request: RequestWithAuth) {}
}
