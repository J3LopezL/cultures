import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureCountryService } from './culture-country.service';
import { CultureEntity } from '../culture/culture.entity';
import { CountryEntity } from 'src/country/country.entity';
import { CultureCountryController } from './culture-country.controller';

@Module({
  providers: [CultureCountryService],
  imports: [TypeOrmModule.forFeature([CultureEntity, CountryEntity])],
  controllers: [CultureCountryController],
})
export class CultureCountryModule {}
