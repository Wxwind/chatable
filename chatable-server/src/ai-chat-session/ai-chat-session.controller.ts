import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AIChatSessionService } from './ai-chat-session.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateSessionDto } from './dto/create-session-dto';
import { RequestWithAuth } from '@/auth/type';

@Controller('ai-chat-session')
@UseGuards(JwtAuthGuard)
export class AIChatSessionController {
  constructor(private aiChatSessionService: AIChatSessionService) {}

  @Post('session')
  create(@Body() dto: CreateSessionDto, @Req() request: RequestWithAuth) {
    const userId = request.user.userId;
    return this.aiChatSessionService.save({ modelName: dto.modelName, userId });
  }

  @Get('sessions')
  getSessions(@Req() request: RequestWithAuth) {
    const userId = request.user.userId;
    return this.aiChatSessionService.findAll(userId);
  }

  @Delete('session/:id')
  async removeSession(@Param('id') sessionId: number, @Req() request: RequestWithAuth) {
    const userId = request.user.userId;
    await this.aiChatSessionService.remove(sessionId);
    return;
  }
}
