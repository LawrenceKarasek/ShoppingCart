import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,OneToMany } from 'typeorm';
import { Tracker} from './tracker.entity';

@Entity()
export class ShortName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 6, unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Tracker, (tracker) => tracker.id, { cascade: true })
  hits: Tracker[]; 
}