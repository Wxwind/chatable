import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '@/user/user.entity';

export enum UserThirdAuthPlatform {
  GITHUB = 'github',
}

@Entity()
@Unique(['openId'])
export class UserThirdAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userThirdAuths)
  user: User;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: UserThirdAuthPlatform })
  platform: UserThirdAuthPlatform;

  @IsNotEmpty()
  @Column()
  openId: string;

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
}
