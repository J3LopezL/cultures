import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let repository: Repository<CityEntity>;
  let cityList: CityEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    cityList = [];
    for (let i = 0; i < 5; i++) {
      const city: CityEntity = await repository.save({
        name: faker.company.name(),
        climate: faker.lorem.sentence(),
      });
      cityList.push(city);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll should return all cities', async () => {
    const cities: CityEntity[] = await service.findAll();
    expect(cities).not.toBeNull();
    expect(cities).toHaveLength(cityList.length);
  });

  it('findOne should return a city by id', async () => {
    const storedcity: CityEntity = cityList[0];
    const city: CityEntity = await service.findOne(storedcity.id);
    expect(city).not.toBeNull();
    expect(city.name).toEqual(storedcity.name);
    expect(city.climate).toEqual(storedcity.climate);
  });

  it('findOne should throw an exception for an invalid city', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('create should return a new city', async () => {
    const city: CityEntity = {
      id: '',
      name: faker.company.name(),
      climate: faker.lorem.sentence(),
      restaurants: [],
      regions: null,
      countries: null,
    };

    const newcity: CityEntity = await service.create(city);
    expect(newcity).not.toBeNull();

    const storedcity: CityEntity = await repository.findOne({
      where: { id: newcity.id },
    });
    expect(storedcity).not.toBeNull();
    expect(storedcity.name).toEqual(newcity.name);
    expect(storedcity.climate).toEqual(newcity.climate);
  });

  it('update should modify a city', async () => {
    const city: CityEntity = cityList[0];
    city.name = 'New name';
    city.climate = 'New climate';

    const updatedcity: CityEntity = await service.update(city.id, city);
    expect(updatedcity).not.toBeNull();

    const storedcity: CityEntity = await repository.findOne({
      where: { id: city.id },
    });
    expect(storedcity).not.toBeNull();
    expect(storedcity.name).toEqual(city.name);
    expect(storedcity.climate).toEqual(city.climate);
  });

  it('update should throw an exception for an invalid city', async () => {
    let city: CityEntity = cityList[0];
    city = {
      ...city,
      name: 'New name',
      climate: 'New Climate',
    };
    await expect(() => service.update('0', city)).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('delete should remove a city', async () => {
    const city: CityEntity = cityList[0];
    await service.delete(city.id);

    const deletedcity: CityEntity = await repository.findOne({
      where: { id: city.id },
    });
    expect(deletedcity).toBeNull();
  });

  it('delete should throw an exception for an invalid city', async () => {
    const city: CityEntity = cityList[0];
    await service.delete(city.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });
});
