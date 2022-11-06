import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { CityEntity } from '../city/city.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CityRestaurantService } from './city-restaurant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('CityRestaurantService', () => {
  let service: CityRestaurantService;
  let cityRepository: Repository<CityEntity>;
  let restaurantRepository: Repository<RestaurantEntity>;
  let city: CityEntity;
  let restaurants: RestaurantEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CityRestaurantService],
    }).compile();

    service = module.get<CityRestaurantService>(CityRestaurantService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
    restaurantRepository = module.get<Repository<RestaurantEntity>>(
      getRepositoryToken(RestaurantEntity),
    );

    await seedDatabase();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const seedDatabase = async () => {
    restaurantRepository.clear();
    cityRepository.clear();

    restaurants = [];
    for (let i = 0; i < 5; i++) {
      const restaurant: RestaurantEntity = await restaurantRepository.save({
        name: faker.company.name(),
        stars: faker.datatype.number({ max: 100 }),
        dateStars: faker.date.soon(10),
        description: faker.lorem.sentence(),
      });
      restaurants.push(restaurant);
    }

    city = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
      restaurants: restaurants,
    });
  };
  it('addRestaurantCity should add an restaurant to a city', async () => {
    const newrestaurant: RestaurantEntity = await restaurantRepository.save({
      name: faker.company.name(),
      stars: faker.datatype.number({ max: 100 }),
      dateStars: faker.date.soon(10),
      description: faker.lorem.sentence(),
    });

    const newcity: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    const result: CityEntity = await service.addRestaurantCity(
      newcity.id,
      newrestaurant.id,
    );

    expect(result.restaurants.length).toBe(1);
    expect(result.restaurants[0]).not.toBeNull();
    expect(result.restaurants[0].name).toBe(newrestaurant.name);
    expect(result.restaurants[0].stars).toBe(newrestaurant.stars);
    expect(result.restaurants[0].dateStars).toStrictEqual(
      newrestaurant.dateStars,
    );
    expect(result.restaurants[0].description).toBe(newrestaurant.description);
  });

  it('addRestaurantCity should thrown exception for an invalid restaurant', async () => {
    const newcity: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addRestaurantCity(newcity.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id was not found',
    );
  });

  it('addRestaurantCity should throw an exception for an invalid city', async () => {
    const newrestaurant: RestaurantEntity = await restaurantRepository.save({
      name: faker.company.name(),
      stars: faker.datatype.number({ max: 100 }),
      dateStars: faker.date.soon(10),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addRestaurantCity('0', newrestaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('findRestaurantByCityIdRestaurantId should return restaurant by city', async () => {
    const restaurant: RestaurantEntity = restaurants[0];
    const storedrestaurant: RestaurantEntity =
      await service.findRestaurantByCityIdRestaurantId(city.id, restaurant.id);
    expect(storedrestaurant).not.toBeNull();
    expect(storedrestaurant.name).toBe(restaurant.name);
    expect(storedrestaurant.stars).toBe(restaurant.stars);
    expect(storedrestaurant.dateStars).toStrictEqual(restaurant.dateStars);
    expect(storedrestaurant.description).toBe(restaurant.description);
  });

  it('findRestaurantByCityIdRestaurantId should throw an exception for an invalid restaurant', async () => {
    await expect(() =>
      service.findRestaurantByCityIdRestaurantId(city.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id was not found',
    );
  });

  it('findRestaurantByCityIdRestaurantId should throw an exception for an invalid city', async () => {
    const restaurant: RestaurantEntity = restaurants[0];
    await expect(() =>
      service.findRestaurantByCityIdRestaurantId('0', restaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('findRestaurantByCityIdRestaurantId should throw an exception for an restaurant not associated to the city', async () => {
    const newrestaurant: RestaurantEntity = await restaurantRepository.save({
      name: faker.company.name(),
      stars: faker.datatype.number({ max: 100 }),
      dateStars: faker.date.soon(10),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.findRestaurantByCityIdRestaurantId(city.id, newrestaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id is not associated to the city',
    );
  });

  it('findRestaurantsByCityId should return restaurants by city', async () => {
    const restaurants: RestaurantEntity[] =
      await service.findRestaurantsByCityId(city.id);
    expect(restaurants.length).toBe(5);
  });

  it('findRestaurantsByCityId should throw an exception for an invalid city', async () => {
    await expect(() =>
      service.findRestaurantsByCityId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('associateRestaurantsCity should update restaurants list for a city', async () => {
    const newrestaurant: RestaurantEntity = await restaurantRepository.save({
      name: faker.company.name(),
      stars: faker.datatype.number({ max: 100 }),
      dateStars: faker.date.soon(10),
      description: faker.lorem.sentence(),
    });

    const updatedcity: CityEntity = await service.associateRestaurantsCity(
      city.id,
      [newrestaurant],
    );
    expect(updatedcity.restaurants.length).toBe(1);

    expect(updatedcity.restaurants[0].name).toBe(newrestaurant.name);
    expect(updatedcity.restaurants[0].description).toBe(
      newrestaurant.description,
    );
    expect(updatedcity.restaurants[0].stars).toBe(newrestaurant.stars);
    expect(updatedcity.restaurants[0].dateStars).toBe(newrestaurant.dateStars);
  });

  it('associateRestaurantsCity should throw an exception for an invalid city', async () => {
    const newrestaurant: RestaurantEntity = await restaurantRepository.save({
      name: faker.company.name(),
      stars: faker.datatype.number({ max: 100 }),
      dateStars: faker.date.soon(10),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.associateRestaurantsCity('0', [newrestaurant]),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('associateRestaurantsCity should throw an exception for an invalid restaurant', async () => {
    const newrestaurant: RestaurantEntity = restaurants[0];
    newrestaurant.id = '0';

    await expect(() =>
      service.associateRestaurantsCity(city.id, [newrestaurant]),
    ).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id was not found',
    );
  });

  it('deleterestaurantTocity should remove an restaurant from a city', async () => {
    const restaurant: RestaurantEntity = restaurants[0];

    await service.deleteRestaurantCity(city.id, restaurant.id);

    const storedcity: CityEntity = await cityRepository.findOne({
      where: { id: city.id },
      relations: ['restaurants'],
    });
    const deletedrestaurant: RestaurantEntity = storedcity.restaurants.find(
      (a) => a.id === restaurant.id,
    );

    expect(deletedrestaurant).toBeUndefined();
  });

  it('deleterestaurantTocity should thrown an exception for an invalid restaurant', async () => {
    await expect(() =>
      service.deleteRestaurantCity(city.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id was not found',
    );
  });

  it('deleterestaurantTocity should thrown an exception for an invalid city', async () => {
    const restaurant: RestaurantEntity = restaurants[0];
    await expect(() =>
      service.deleteRestaurantCity('0', restaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('deleterestaurantTocity should thrown an exception for an non asocciated restaurant', async () => {
    const newrestaurant: RestaurantEntity = await restaurantRepository.save({
      name: faker.company.name(),
      stars: faker.datatype.number({ max: 100 }),
      dateStars: faker.date.soon(10),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.deleteRestaurantCity(city.id, newrestaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id is not associated to the city',
    );
  });
});
