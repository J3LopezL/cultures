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
import { RestaurantDto } from 'src/restaurant/restaurant.dto';
import { RestaurantEntity } from 'src/restaurant/restaurant.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CityRestaurantService } from './city-restaurant.service';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CityRestaurantController {
  constructor(private readonly CityRestaurantService: CityRestaurantService) {}

  @Post(':cityId/restaurants/:restaurantId')
  async addTiendaProduct(
    @Param('cityId') cityId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return await this.CityRestaurantService.addRestaurantCity(
      cityId,
      restaurantId,
    );
  }

  @Get(':cityId/restaurants/:restaurantId')
  async findTiendaBycityIdrestaurantId(
    @Param('cityId') cityId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return await this.CityRestaurantService.findRestaurantByCityIdRestaurantId(
      cityId,
      restaurantId,
    );
  }

  @Get(':cityId/restaurants')
  async findrestaurantsBycityId(@Param('cityId') cityId: string) {
    return await this.CityRestaurantService.findRestaurantsByCityId(cityId);
  }

  @Put(':cityId/restaurants')
  async associaterestaurantsProducto(
    @Body() restaurantsDto: RestaurantDto[],
    @Param('cityId') cityId: string,
  ) {
    const restaurants = plainToInstance(RestaurantEntity, restaurantsDto);
    return await this.CityRestaurantService.associateRestaurantsCity(
      cityId,
      restaurants,
    );
  }

  @Delete(':cityId/restaurants/:restaurantId')
  @HttpCode(204)
  async deleteTiendaProducto(
    @Param('cityId') cityId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return await this.CityRestaurantService.deleteRestaurantCity(
      cityId,
      restaurantId,
    );
  }
}
