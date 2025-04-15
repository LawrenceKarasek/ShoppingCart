import { Injectable, NotAcceptableException, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { URL } from '../database/entities/url.entity';
import { CreateUrlDto, UpdateUrlDto } from './url.dto';
import { ShortNameService } from '../short-name/short-name.service';
import { TrackerService } from '../tracker/tracker.service';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(URL)
    private readonly urlRepository: Repository<URL>,
    private readonly shortNameService: ShortNameService,
    private readonly trackerService: TrackerService
  ) {}

  async getAllURLsForUser(userId: number): Promise<URL[]> {
    return this.urlRepository.find({
      where: { userId }, 
      order: { created_at: 'DESC' } 
    });
  }

  async getOriginalURL(shortURL: string): Promise<URL> {
    let urlObj:URL 
    try{
      const url = await this.urlRepository.findOne({
        where: { short: shortURL}, 
      });

      if (!url) {
        throw new NotFoundException('URL not found');
      }
      else {
        urlObj = url
      }

      const shortNameObj = await this.shortNameService.findShortNameByName(shortURL)
      if(!shortNameObj){
        throw new NotFoundException('shortName record not found'); 
      }

      const isValid = await this.trackerService.rateLimitValid(shortNameObj.id)
      
      if(!isValid){
        throw new UnauthorizedException(`rate limit exceeded shortName: ${JSON.stringify(shortNameObj)}`);     
      }

      await this.trackerService.addTracker(shortNameObj.id)

      const {hits} = urlObj
      const hitsUpdate = (hits??0)+1
      const updateUrlDto: UpdateUrlDto = {...urlObj,hits:hitsUpdate}

      const updatedUrl = this.urlRepository.merge(url, updateUrlDto);
      return this.urlRepository.save(updatedUrl);

    } catch (error) {
      console.error('UrlService: getOriginalURL Error :', error.message);
      throw error;
    }
  
  }


  async addURL(createUrlDto: CreateUrlDto & { userId: number }): Promise<URL> {

    const short = await this.shortNameService.generateUniqueShortName();
    
    try{
      const newUrl = this.urlRepository.create({
        ...createUrlDto,
        short,
        userId: createUrlDto.userId
      });

      const result = this.urlRepository.save(newUrl);
      return result

    } catch (error) {
      console.error('UrlService: Error creating URL:', error.message);
      throw error;
    }
  
  }

  async updateURL(id: number, updateUrlDto: UpdateUrlDto): Promise<URL> {
    const url = await this.urlRepository.findOne({
      where: { id } 
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    if(!updateUrlDto.short){
      throw new NotFoundException('Short value not found');     
    }

    const short = await this.shortNameService.findShortNameByName(updateUrlDto.short)

    if(short){
      throw new NotAcceptableException('Duplicate Short value entered.');    
    }
    else {
      const updatedUrl = this.urlRepository.merge(url, updateUrlDto);
      return await this.urlRepository.save(updatedUrl);
    }

  }
}
