import { Module } from '@nestjs/common';
import { DbConfigService } from './db-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { URL } from './entities/url.entity';
import { ShortName } from './entities/short-name.entity';
import { Tracker } from './entities/tracker.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
    }),
    TypeOrmModule.forFeature([User, URL, ShortName,Tracker]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
