import { AIChatMessage } from '@/ai-chat-message/ai-chat-message.entity';
import { User } from '@/user/user.entity';
import { PrimaryGeneratedColumn, JoinColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';

export class AIChatSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.aiChatSessions)
  @JoinColumn()
  user: User;

  @OneToMany(() => AIChatMessage, (aiChatMessage) => aiChatMessage.aiChatSession)
  aiChatMessages: AIChatMessage[];

  @Column()
  modelName: string;

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
