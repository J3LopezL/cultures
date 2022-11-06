import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let repository: Repository<RestaurantEntity>;
  let restaurantList: RestaurantEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantService],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<Repository<RestaurantEntity>>(
      getRepositoryToken(RestaurantEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    restaurantList = [];
    for (let i = 0; i < 5; i++) {
      const restaurant: RestaurantEntity = await repository.save({
        name: faker.company.name(),
        stars: faker.datatype.number({ max: 100 }),
        dateStars: faker.date.soon(10),
        description: faker.lorem.sentence(),
      });
      restaurantList.push(restaurant);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll should return all restaurants', async () => {
    const restaurants: RestaurantEntity[] = await service.findAll();
    expect(restaurants).not.toBeNull();
    expect(restaurants).toHaveLength(restaurantList.length);
  });

  it('findOne should return a restaurant by id', async () => {
    const storedrestaurant: RestaurantEntity = restaurantList[0];
    const restaurant: RestaurantEntity = await service.findOne(
      storedrestaurant.id,
    );
    expect(restaurant).not.toBeNull();
    expect(restaurant.name).toEqual(storedrestaurant.name);
    expect(restaurant.description).toEqual(storedrestaurant.description);
    expect(restaurant.stars).toEqual(storedrestaurant.stars);
    expect(restaurant.dateStars).toEqual(storedrestaurant.dateStars);
  });

  it('findOne should throw an exception for an invalid restaurant', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id was not found',
    );
  });

  it('create should return a new restaurant', async () => {
    const restaurant: RestaurantEntity = {
      id: '',
      name: faker.company.name(),
      stars: faker.datatype.number({ max: 100 }),
      dateStars: faker.date.soon(10),
      description: faker.lorem.sentence(),
      cities: null,
    };

    const newrestaurant: RestaurantEntity = await service.create(restaurant);
    expect(newrestaurant).not.toBeNull();

    const storedrestaurant: RestaurantEntity = await repository.findOne({
      where: { id: newrestaurant.id },
    });
    expect(storedrestaurant).not.toBeNull();
    expect(storedrestaurant.name).toEqual(newrestaurant.name);
    expect(storedrestaurant.description).toEqual(newrestaurant.description);
    expect(storedrestaurant.stars).toEqual(newrestaurant.stars);
    expect(storedrestaurant.dateStars).toEqual(newrestaurant.dateStars);
  });

  it('update should modify a restaurant', async () => {
    const restaurant: RestaurantEntity = restaurantList[0];
    restaurant.name = 'New name';
    restaurant.stars = 5;

    const updatedrestaurant: RestaurantEntity = await service.update(
      restaurant.id,
      restaurant,
    );
    expect(updatedrestaurant).not.toBeNull();

    const storedrestaurant: RestaurantEntity = await repository.findOne({
      where: { id: restaurant.id },
    });
    expect(storedrestaurant).not.toBeNull();
    expect(storedrestaurant.name).toEqual(restaurant.name);
    expect(storedrestaurant.stars).toEqual(restaurant.stars);
  });

  it('update should throw an exception for an invalid restaurant', async () => {
    let restaurant: RestaurantEntity = restaurantList[0];
    restaurant = {
      ...restaurant,
      name: 'New name',
      stars: 5,
    };
    await expect(() => service.update('0', restaurant)).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id was not found',
    );
  });

  it('delete should remove a restaurant', async () => {
    const restaurant: RestaurantEntity = restaurantList[0];
    await service.delete(restaurant.id);

    const deletedrestaurant: RestaurantEntity = await repository.findOne({
      where: { id: restaurant.id },
    });
    expect(deletedrestaurant).toBeNull();
  });

  it('delete should throw an exception for an invalid restaurant', async () => {
    const restaurant: RestaurantEntity = restaurantList[0];
    await service.delete(restaurant.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The restaurant with the given id was not found',
    );
  });
});
