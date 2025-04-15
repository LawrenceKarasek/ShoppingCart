import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { ShortNameService } from '../short-name/short-name.service';
import { TrackerService } from '../tracker/tracker.service';
import { DbModule } from '../database/db.module';

@Module({
    imports: [DbModule], 
    controllers: [UrlController],
    providers: [UrlService, ShortNameService,TrackerService] 
  })
  export class UrlModule {}