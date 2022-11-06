/* eslint-disable prettier/prettier */
import * as sqliteStore from 'cache-manager-sqlite';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryResolver } from './country.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity]), CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })],
  providers: [CountryService, CountryResolver],
  controllers: [CountryController],
})
export class CountryModule {}
