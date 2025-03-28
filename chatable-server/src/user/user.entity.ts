import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, Unique } from 'typeorm';
import { AIChatSession } from '@/ai-chat-session/ai-chat-session.entity';
import { UserThirdAuth } from '@/user-third-auth/user-third-auth.entity';

@Entity()
@Unique(['phone', 'email', 'githubId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;

  @Column({ length: 60 })
  password: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deletedAt: Date;

  @OneToMany(() => AIChatSession, (session) => session.user)
  aiChatSessions: AIChatSession[];

  @OneToMany(() => UserThirdAuth, (userThirdAuth) => userThirdAuth.user)
  userThirdAuths: UserThirdAuth[];
}
