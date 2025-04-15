
import { Injectable,InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Tracker } from '../database/entities/tracker.entity'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(Tracker)
    private readonly trackerRepo: Repository<Tracker>,
    private readonly configService: ConfigService, 
  ) {}

  async rateLimitValid(shortNameId:number):Promise<boolean>{
    const RATE_LIMIT = this.configService.get<string>('RATE_LIMIT'); 
    const RATE_MINS = this.configService.get<string>('RATE_MINS'); 

    if(!RATE_LIMIT ){
      throw new InternalServerErrorException(
        'RATE_LIMIT missing.'
      );
    }

    if(!RATE_MINS ){
      throw new InternalServerErrorException(
        'RATE_MINS missing.'
      );
    }

    try{

      const  trackerCount = await this.getCount(shortNameId,Number(RATE_MINS) )
      return trackerCount < Number(RATE_LIMIT) ? true : false

    } catch (error) {
      console.error('TrackerService: rateLimitValid Error:', error.message);
      throw error;
    }

  }

  private async getCount(shortNameId: number, mins: number): Promise<number> {
    const cutoffDate = new Date(Date.now() - mins * 60000);
    
    return this.trackerRepo.count({
      where: {
        shortNameId,
        created_at: MoreThan(cutoffDate)
      }
    });
  }

  async addTracker(shortNameId: number ): Promise<Tracker> {
    try{
      const newTracker = this.trackerRepo.create({
        shortNameId
      });

      return this.trackerRepo.save(newTracker);

    } catch (error) {
      console.error('TrackerService: Error add Tracker:', error.message);
      throw error;
    }
  
  }

}