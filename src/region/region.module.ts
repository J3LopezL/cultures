import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from './region.entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { RegionResolver } from './region.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  providers: [RegionService, RegionResolver],
  controllers: [RegionController],
})
export class RegionModule {}
