import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ai-chat-message')
@ApiBearerAuth()
export class AIChatMessageController {}
