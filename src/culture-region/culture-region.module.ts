import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureRegionService } from './culture-region.service';
import { CultureEntity } from '../culture/culture.entity';
import { RegionEntity } from '../region/region.entity';
import { CultureRegionController } from './culture-region.controller';

@Module({
  providers: [CultureRegionService],
  imports: [TypeOrmModule.forFeature([CultureEntity, RegionEntity])],
  controllers: [CultureRegionController],
})
export class CultureRegionModule {}
