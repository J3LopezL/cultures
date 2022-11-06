import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CityEntity } from '../city/city.entity';
import { CountryEntity } from '../country/country.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CountryCityService } from './country-city.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('CountryCityService', () => {
  let service: CountryCityService;
  let countryRepository: Repository<CountryEntity>;
  let cityRepository: Repository<CityEntity>;
  let city: CountryEntity;
  let cities: CityEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CountryCityService],
    }).compile();

    service = module.get<CountryCityService>(CountryCityService);
    countryRepository = module.get<Repository<CountryEntity>>(
      getRepositoryToken(CountryEntity),
    );
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );

    await seedDatabase();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const seedDatabase = async () => {
    cityRepository.clear();
    countryRepository.clear();

    cities = [];
    for (let i = 0; i < 5; i++) {
      const city: CityEntity = await cityRepository.save({
        name: faker.company.name(),
        climate: faker.lorem.sentence(),
      });
      cities.push(city);
    }

    city = await countryRepository.save({
      name: faker.company.name(),
      location: faker.lorem.sentence(),
      cities: cities,
    });
  };
  it('addCityCountry should add an restaurant to a city', async () => {
    const newrestaurant: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    const newcity: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.lorem.sentence(),
    });

    const result: CountryEntity = await service.addCityCountry(
      newcity.id,
      newrestaurant.id,
    );

    expect(result.cities.length).toBe(1);
    expect(result.cities[0]).not.toBeNull();
    expect(result.cities[0].name).toBe(newrestaurant.name);
    expect(result.cities[0].climate).toBe(newrestaurant.climate);
  });

  it('addCityCountry should thrown exception for an invalid city', async () => {
    const newcity: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addCityCountry(newcity.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('addCityCountry should throw an exception for an invalid city', async () => {
    const newrestaurant: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addCityCountry('0', newrestaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('findCityByCountryIdCityId should return restaurant by city', async () => {
    const restaurant: CityEntity = cities[0];
    const storedrestaurant: CityEntity =
      await service.findCityByCountryIdCityId(city.id, restaurant.id);
    expect(storedrestaurant).not.toBeNull();
    expect(storedrestaurant.name).toBe(restaurant.name);
    expect(storedrestaurant.climate).toBe(restaurant.climate);
  });

  it('findCityByCountryIdCityId should throw an exception for an invalid ciuda', async () => {
    await expect(() =>
      service.findCityByCountryIdCityId(city.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('findCityByCountryIdCityId should throw an exception for an invalid city', async () => {
    const restaurant: CityEntity = cities[0];
    await expect(() =>
      service.findCityByCountryIdCityId('0', restaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('findCityByCountryIdCityId should throw an exception for an restaurant not associated to the city', async () => {
    const newrestaurant: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    await expect(() =>
      service.findCityByCountryIdCityId(city.id, newrestaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id is not associated to the country',
    );
  });

  it('findCityesByCountryId should return cities by country', async () => {
    const cities: CityEntity[] = await service.findCityesByCountryId(city.id);
    expect(cities.length).toBe(5);
  });

  it('findCityesByCountryId should throw an exception for an invalid country', async () => {
    await expect(() =>
      service.findCityesByCountryId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('associateCityesCountry should update cities list for a city', async () => {
    const newrestaurant: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    const updatedcity: CountryEntity = await service.associateCityesCountry(
      city.id,
      [newrestaurant],
    );
    expect(updatedcity.cities.length).toBe(1);

    expect(updatedcity.cities[0].name).toBe(newrestaurant.name);
    expect(updatedcity.cities[0].climate).toBe(newrestaurant.climate);
  });

  it('associateCityesCountry should throw an exception for an invalid city', async () => {
    const newrestaurant: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    await expect(() =>
      service.associateCityesCountry('0', [newrestaurant]),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('associateCityesCountry should throw an exception for an invalid restaurant', async () => {
    const newrestaurant: CityEntity = cities[0];
    newrestaurant.id = '0';

    await expect(() =>
      service.associateCityesCountry(city.id, [newrestaurant]),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('deleterestaurantTocity should remove an restaurant from a city', async () => {
    const restaurant: CityEntity = cities[0];

    await service.deleteCityCountry(city.id, restaurant.id);

    const storedcity: CountryEntity = await countryRepository.findOne({
      where: { id: city.id },
      relations: ['cities'],
    });
    const deletedrestaurant: CityEntity = storedcity.cities.find(
      (a) => a.id === restaurant.id,
    );

    expect(deletedrestaurant).toBeUndefined();
  });

  it('deleterestaurantTocity should thrown an exception for an invalid restaurant', async () => {
    await expect(() =>
      service.deleteCityCountry(city.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('deleterestaurantTocity should thrown an exception for an invalid city', async () => {
    const restaurant: CityEntity = cities[0];
    await expect(() =>
      service.deleteCityCountry('0', restaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('deleterestaurantTocity should thrown an exception for an non asocciated restaurant', async () => {
    const newrestaurant: CityEntity = await cityRepository.save({
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
    });

    await expect(() =>
      service.deleteCityCountry(city.id, newrestaurant.id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id is not associated to the country',
    );
  });
});
