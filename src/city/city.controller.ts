import { CityService } from './city.service';
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
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CityDto } from './city.dto';
import { CityEntity } from './city.entity';
import { plainToInstance } from 'class-transformer';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CityController {
  constructor(private readonly CityService: CityService) {}

  @Get()
  async findAll() {
    return await this.CityService.findAll();
  }

  @Get(':cityId')
  async findOne(@Param('cityId') cityId: string) {
    return await this.CityService.findOne(cityId);
  }

  @Post()
  async create(@Body() CityDto: CityDto) {
    const restaurant: CityEntity = plainToInstance(CityEntity, CityDto);
    return await this.CityService.create(restaurant);
  }

  @Put(':cityId')
  async update(@Param('cityId') cityId: string, @Body() CityDto: CityDto) {
    const restaurant: CityEntity = plainToInstance(CityEntity, CityDto);
    return await this.CityService.update(cityId, restaurant);
  }

  @Delete(':cityId')
  @HttpCode(204)
  async delete(@Param('cityId') cityId: string) {
    return await this.CityService.delete(cityId);
  }
}
