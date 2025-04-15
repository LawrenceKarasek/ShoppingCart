import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { UrlService } from './url.service';
import { CreateUrlDto, UpdateUrlDto } from './url.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  async getAllUrls(@User() user: any) {
    return this.urlService.getAllURLsForUser(user.userId);
  }
  @Get(':shortUrl')
  async getOriginal(@Param('shortUrl')shortUrl:string ) {
    return this.urlService.getOriginalURL(shortUrl);
  }

  @Post()
  async addShortUrl(@User() user: any, @Body() createUrlDto: CreateUrlDto) {

    return this.urlService.addURL({
      ...createUrlDto,
      userId: user.userId
    });
  }

  @Put(':id')
  async updateUrl(
    @User() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUrlDto: UpdateUrlDto
  ) {
    return this.urlService.updateURL(id, updateUrlDto);
  }
}
