import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityRestaurantService } from './city-restaurant.service';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { CityEntity } from '../city/city.entity';
import { CityRestaurantController } from './city-restaurant.controller';

@Module({
  providers: [CityRestaurantService],
  imports: [TypeOrmModule.forFeature([CityEntity, RestaurantEntity])],
  controllers: [CityRestaurantController],
})
export class CityRestaurantModule {}
