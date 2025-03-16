import { AIChatSession } from '@/ai-chat-session/ai-chat-session.entity';
import { Column, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class AIChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AIChatSession, (session) => session.aiChatMessages)
  @JoinColumn()
  aiChatSession: AIChatSession;

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
