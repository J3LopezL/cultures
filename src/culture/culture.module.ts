import * as sqliteStore from 'cache-manager-sqlite';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureEntity } from './culture.entity';
import { CultureService } from './culture.service';
import { CultureController } from './culture.controller';
import { CultureResolver } from './culture.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CultureEntity]), CacheModule.register(),
  CacheModule.register({
    store: sqliteStore,
    path: ':memory:',
    options: {
      ttl: 5
    },
  })],
  providers: [CultureService, CultureResolver],
  controllers: [CultureController],
})
export class CultureModule {}
