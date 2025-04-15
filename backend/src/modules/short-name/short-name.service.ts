import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortName } from '../database/entities/short-name.entity';

@Injectable()
export class ShortNameService {
  constructor(
    @InjectRepository(ShortName)
    private readonly shortNameRepo: Repository<ShortName>
  ) {}

  private generateRandomShortName(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
  }

  async findShortNameByName(shortName:string):  Promise<ShortName|null> { 
    return await this.shortNameRepo.findOne({ where: { name: shortName } });
  }

  async generateUniqueShortName(): Promise<string> {
    let isUnique = false;
    let shortName: string = "";

    while (!isUnique) {
      shortName = this.generateRandomShortName();
      const exists = await this.shortNameRepo.findOne({ where: { name: shortName } });
      if (!exists) {
        isUnique = true;
        await this.shortNameRepo.save({ name: shortName });
      }
    }

    return shortName;
  }
}
