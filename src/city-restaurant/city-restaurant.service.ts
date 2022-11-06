import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { CityEntity } from '../city/city.entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class CityRestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,

    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}
  async addRestaurantCity(
    cityId: string,
    restaurantId: string,
  ): Promise<CityEntity> {
    const restaurant: RestaurantEntity =
      await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const city: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['countries', 'regions', 'restaurants'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    city.restaurants = [...city.restaurants, restaurant];
    return await this.cityRepository.save(city);
  }

  async findRestaurantByCityIdRestaurantId(
    cityId: string,
    restaurantId: string,
  ): Promise<RestaurantEntity> {
    const restaurant: RestaurantEntity =
      await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const city: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['restaurants'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cityRestaurant: RestaurantEntity = city.restaurants.find(
      (e) => e.id === restaurant.id,
    );

    if (!cityRestaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id is not associated to the city',
        BusinessError.PRECONDITION_FAILED,
      );

    return cityRestaurant;
  }

  async findRestaurantsByCityId(cityId: string): Promise<RestaurantEntity[]> {
    const city: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['restaurants'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return city.restaurants;
  }

  async associateRestaurantsCity(
    cityId: string,
    restaurants: RestaurantEntity[],
  ): Promise<CityEntity> {
    const city: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['restaurants'],
    });

    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < restaurants.length; i++) {
      const restaurant: RestaurantEntity =
        await this.restaurantRepository.findOne({
          where: { id: restaurants[i].id },
        });
      if (!restaurant)
        throw new BusinessLogicException(
          'The restaurant with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    city.restaurants = restaurants;
    return await this.cityRepository.save(city);
  }

  async deleteRestaurantCity(cityId: string, restaurantId: string) {
    const restaurantDeleted: RestaurantEntity =
      await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurantDeleted)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cityDeleted: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['restaurants'],
    });
    if (!cityDeleted)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cityRestaurantD: RestaurantEntity = cityDeleted.restaurants.find(
      (e) => e.id === restaurantDeleted.id,
    );

    if (!cityRestaurantD)
      throw new BusinessLogicException(
        'The restaurant with the given id is not associated to the city',
        BusinessError.PRECONDITION_FAILED,
      );
    cityDeleted.restaurants = cityDeleted.restaurants.filter(
      (e) => e.id !== restaurantId,
    );
    await this.cityRepository.save(cityDeleted);
  }
}
