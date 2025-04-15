import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { URL } from './url.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => URL, (url) => url.user, { cascade: true })
  savedURLs: URL[]; 
}