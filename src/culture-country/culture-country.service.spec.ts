import { Test, TestingModule } from '@nestjs/testing';
import { CountryEntity } from '../country/country.entity';
import { CultureEntity } from '../culture/culture.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CultureCountryService } from './culture-country.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('CultureCountryService', () => {
  let service: CultureCountryService;
  let cultureRepository: Repository<CultureEntity>;
  let countryRepository: Repository<CountryEntity>;
  let culture: CultureEntity;
  let countriesList: CountryEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CultureCountryService],
    }).compile();

    service = module.get<CultureCountryService>(CultureCountryService);
    cultureRepository = module.get<Repository<CultureEntity>>(
      getRepositoryToken(CultureEntity),
    );
    countryRepository = module.get<Repository<CountryEntity>>(
      getRepositoryToken(CountryEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    countryRepository.clear();
    cultureRepository.clear();
    countriesList = [];
    for (let i = 0; i < 5; i++) {
      const country: CountryEntity = await countryRepository.save({
        name: faker.company.name(),
      });
      countriesList.push(country);
    }
    culture = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      countries: countriesList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addCountryCulture should add a country to a culture', async () => {
    const newCountry: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.address.latitude.toString(),
    });

    const newCulture: CultureEntity = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    });

    const result: CultureEntity = await service.addCountryCulture(
      newCulture.id,
      newCountry.id,
    );

    expect(result.countries.length).toBe(1);
    expect(result.countries[0]).not.toBeNull();
    expect(result.countries[0].name).toBe(newCountry.name);
  });

  it('addCountryCulture should thrown exception for an invalid country', async () => {
    const newCulture: CultureEntity = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addCountryCulture(newCulture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('addCountryCulture should throw an exception for an invalid culture', async () => {
    const newCountry: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.address.latitude.toString(),
    });

    await expect(() =>
      service.addCountryCulture('0', newCountry.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('findCountryByCultureIdCountryId should return country by culture', async () => {
    const country: CountryEntity = countriesList[0];
    const storedCountry: CountryEntity =
      await service.findCountryByCultureIdCountryId(culture.id, country.id);
    expect(storedCountry).not.toBeNull();
    expect(storedCountry.name).toBe(country.name);
  });

  it('findCountryByCultureIdCountryId should throw an exception for an invalid country', async () => {
    await expect(() =>
      service.findCountryByCultureIdCountryId(culture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('findCountryByCultureIdCountryId should throw an exception for an invalid culture', async () => {
    const country: CountryEntity = countriesList[0];
    await expect(() =>
      service.findCountryByCultureIdCountryId('0', country.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('findCountryByCultureIdCountryId should throw an exception for an region not associated to the culture', async () => {
    const newCountry: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.address.latitude.toString(),
    });

    await expect(() =>
      service.findCountryByCultureIdCountryId(culture.id, newCountry.id),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id is not associated to the culture',
    );
  });

  it('findCountriesByCultureId should return regions by culture', async () => {
    const countries: CountryEntity[] = await service.findCountriesByCultureId(
      culture.id,
    );
    expect(countries.length).toBe(5);
  });

  it('findCountriesByCultureId should throw an exception for an invalid culture', async () => {
    await expect(() =>
      service.findCountriesByCultureId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('associateCountriesCulture should update regions list for a culture', async () => {
    const newCountry: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.address.latitude.toString(),
    });
    const updatedculture: CultureEntity =
      await service.associateCountriesCulture(culture.id, [newCountry]);
    expect(updatedculture.countries.length).toBe(1);
    expect(updatedculture.countries[0].name).toBe(newCountry.name);
  });

  it('associateCountriesCulture should throw an exception for an invalid culture', async () => {
    const newCountry: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.address.latitude.toString(),
    });
    await expect(() =>
      service.associateCountriesCulture('0', [newCountry]),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('associateCountriesCulture should throw an exception for an invalid country', async () => {
    const newCountry: CountryEntity = countriesList[0];
    newCountry.id = '0';
    await expect(() =>
      service.associateCountriesCulture(culture.id, [newCountry]),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('deleteCountryCulture should remove an region from a culture', async () => {
    const country: CountryEntity = countriesList[0];
    await service.deleteCountryCulture(culture.id, country.id);
    const storedculture: CultureEntity = await cultureRepository.findOne({
      where: { id: `${culture.id}` },
      relations: ['countries'],
    });
    const deletedCountry: CountryEntity = storedculture.countries.find(
      (a) => a.id === country.id,
    );
    expect(deletedCountry).toBeUndefined();
  });

  it('deleteCountryCulture should thrown an exception for an invalid region', async () => {
    await expect(() =>
      service.deleteCountryCulture(culture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id was not found',
    );
  });

  it('deleteCountryCulture should thrown an exception for an invalid culture', async () => {
    const country: CountryEntity = countriesList[0];
    await expect(() =>
      service.deleteCountryCulture('0', country.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('deleteCountryCulture should thrown an exception for an non asocciated region', async () => {
    const newCountry: CountryEntity = await countryRepository.save({
      name: faker.company.name(),
      location: faker.address.latitude.toString(),
    });
    await expect(() =>
      service.deleteCountryCulture(culture.id, newCountry.id),
    ).rejects.toHaveProperty(
      'message',
      'The country with the given id is not associated to the culture',
    );
  });
});
