import { AIChatMessage } from './ai-chat-message.entity';

export type CreateAIChatMessageType = Pick<AIChatMessage, 'sender' | 'message'> & { sessionId: number };
