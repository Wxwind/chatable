import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from './constants';
import { AIChatSession } from '@/ai-chat-session/ai-chat-session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column()
  nickname: string;

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

  @BeforeInsert()
  async encryptPwd() {
    const password = await bcrypt.hash(this.password, saltOrRounds);
    this.password = password;
  }
}
