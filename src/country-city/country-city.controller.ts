import {
  Controller,
  UseInterceptors,
  Get,
  Param,
  Post,
  Body,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CityDto } from 'src/city/city.dto';
import { CityEntity } from 'src/city/city.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CountryCityService } from './country-city.service';

@Controller('countries')
@UseInterceptors(BusinessErrorsInterceptor)
export class CountryCityController {
  constructor(private readonly CountryCityService: CountryCityService) {}

  @Post(':countryId/cities/:cityId')
  async addTiendaProduct(
    @Param('countryId') countryId: string,
    @Param('cityId') cityId: string,
  ) {
    return await this.CountryCityService.addCityCountry(countryId, cityId);
  }

  @Get(':countryId/cities/:cityId')
  async findTiendaBycountryIdcityId(
    @Param('countryId') countryId: string,
    @Param('cityId') cityId: string,
  ) {
    return await this.CountryCityService.findCityByCountryIdCityId(
      countryId,
      cityId,
    );
  }

  @Get(':countryId/cities')
  async findcitiesBycountryId(@Param('countryId') countryId: string) {
    return await this.CountryCityService.findCityesByCountryId(countryId);
  }

  @Put(':countryId/cities')
  async associatecitiesProducto(
    @Body() citiesDto: CityDto[],
    @Param('countryId') countryId: string,
  ) {
    const cities = plainToInstance(CityEntity, citiesDto);
    return await this.CountryCityService.associateCityesCountry(
      countryId,
      cities,
    );
  }

  @Delete(':countryId/cities/:cityId')
  @HttpCode(204)
  async deleteTiendaProducto(
    @Param('countryId') countryId: string,
    @Param('cityId') cityId: string,
  ) {
    return await this.CountryCityService.deleteCityCountry(countryId, cityId);
  }
}
