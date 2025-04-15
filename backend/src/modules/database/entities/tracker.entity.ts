import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,ManyToOne } from 'typeorm';
import { ShortName} from './short-name.entity';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column() 
  shortNameId: number;

  @ManyToOne(() => ShortName, (shortName) => shortName.hits)
  shortName: ShortName;
}