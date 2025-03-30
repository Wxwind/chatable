import { AIChatSession } from '@/ai-chat-session/ai-chat-session.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum AIChatMessageSender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

@Entity()
export class AIChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AIChatSession, (session) => session.aiChatMessages)
  aiChatSession: AIChatSession;

  @Column({
    type: 'enum',
    enum: AIChatMessageSender,
  })
  sender: AIChatMessageSender;

  @Column()
  message: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deletedAt: Date;
}
