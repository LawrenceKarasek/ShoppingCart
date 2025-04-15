import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class URL {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original: string;

  @Column()
  short: string;

  @Column({ nullable: true }) 
  hits: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ name: 'user_id' }) // Explicitly map to the database column
  userId: number;

  @ManyToOne(() => User, (user) => user.savedURLs)
  user: User;
}