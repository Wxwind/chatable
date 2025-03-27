import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, OneToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['phone', 'email', 'githubId'])
export class UserThirdAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne()
  userId: string;

  @IsNotEmpty()
  @Column()
  platform: string;

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
