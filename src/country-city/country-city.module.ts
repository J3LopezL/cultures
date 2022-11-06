import { Module } from '@nestjs/common';
import { CityEntity } from 'src/city/city.entity';
import { CountryEntity } from 'src/country/country.entity';
import { CountryCityService } from './country-city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryCityController } from './country-city.controller';

@Module({
  providers: [CountryCityService],
  imports: [TypeOrmModule.forFeature([CountryEntity, CityEntity])],
  controllers: [CountryCityController],
})
export class CountryCityModule {}
