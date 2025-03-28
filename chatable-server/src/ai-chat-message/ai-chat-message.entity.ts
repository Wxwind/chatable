import { AIChatSession } from '@/ai-chat-session/ai-chat-session.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AIChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AIChatSession, (session) => session.aiChatMessages)
  aiChatSession: AIChatSession;

  @Column()
  sender: 'user' | 'ai' | 'system';

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
