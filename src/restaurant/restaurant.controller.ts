import { RestaurantService } from './restaurant.service';
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
import { RestaurantDto } from './restaurant.dto';
import { RestaurantEntity } from './restaurant.entity';
import { plainToInstance } from 'class-transformer';

@Controller('restaurants')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantController {
  constructor(private readonly RestaurantService: RestaurantService) {}

  @Get()
  async findAll() {
    return await this.RestaurantService.findAll();
  }

  @Get(':restaurantId')
  async findOne(@Param('restaurantId') restaurantId: string) {
    return await this.RestaurantService.findOne(restaurantId);
  }

  @Post()
  async create(@Body() RestaurantDto: RestaurantDto) {
    const restaurant: RestaurantEntity = plainToInstance(
      RestaurantEntity,
      RestaurantDto,
    );
    return await this.RestaurantService.create(restaurant);
  }

  @Put(':restaurantId')
  async update(
    @Param('restaurantId') restaurantId: string,
    @Body() RestaurantDto: RestaurantDto,
  ) {
    const restaurant: RestaurantEntity = plainToInstance(
      RestaurantEntity,
      RestaurantDto,
    );
    return await this.RestaurantService.update(restaurantId, restaurant);
  }

  @Delete(':restaurantId')
  @HttpCode(204)
  async delete(@Param('restaurantId') restaurantId: string) {
    return await this.RestaurantService.delete(restaurantId);
  }
}
