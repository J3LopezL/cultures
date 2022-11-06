import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CultureService } from '../culture/culture.service';
import { CultureEntity } from '../culture/culture.entity';
import { RegionEntity } from './region.entity';
import { RegionService } from './region.service';
import { CacheModule } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('Region Gastro Service', () => {
  let service: RegionService;
  let serviceG: CultureService;
  let repository: Repository<RegionEntity>;
  let repositoryG: Repository<CultureEntity>;
  let RegionsList: RegionEntity[];
  let CulturesList: CultureEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [RegionService, CultureService],
    }).compile();

    service = module.get<RegionService>(RegionService);
    serviceG = module.get<CultureService>(CultureService);
    repository = module.get<Repository<RegionEntity>>(
      getRepositoryToken(RegionEntity),
    );
    repositoryG = module.get<Repository<CultureEntity>>(
      getRepositoryToken(CultureEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    RegionsList = [];
    for (let i = 0; i < 5; i++) {
      const region: RegionEntity = await repository.save({
        name: faker.company.name(),
      });
      RegionsList.push(region);
    }

    repositoryG.clear();
    CulturesList = [];
    for (let i = 0; i < 5; i++) {
      const culture: CultureEntity = await repositoryG.save({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
      });
      CulturesList.push(culture);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all regions', async () => {
    const regions: RegionEntity[] = await service.findAll();
    expect(regions).not.toBeNull();
    expect(regions).toHaveLength(RegionsList.length);
  });

  it('findOne should return a region by id', async () => {
    const storedRegion: RegionEntity = RegionsList[0];
    const region: RegionEntity = await service.findOne(storedRegion.id);
    expect(region).not.toBeNull();
    expect(region.name).toEqual(storedRegion.name);
  });

  it('findOne should throw an exception for an invalid region', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The region with the given id was not found',
    );
  });

  it('create should a new culture and return a new region', async () => {
    const cultureG: CultureEntity = {
      id: '',
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      regions: [],
      recipes: [],
      countries: [],
    };

    const newCultureR: CultureEntity = await serviceG.create(cultureG);
    const storedCultureR: CultureEntity = await repositoryG.findOne({
      where: { id: newCultureR.id },
    });

    const region: RegionEntity = {
      id: '',
      name: faker.company.name(),
      cultures: storedCultureR,
      countries: null,
      cities: null,
    };

    const newRegion: RegionEntity = await service.create(region);
    expect(newRegion).not.toBeNull();
    const storedRegion: RegionEntity = await repository.findOne({
      where: { id: newRegion.id },
    });
    expect(storedRegion).not.toBeNull();
    expect(storedRegion.name).toEqual(newRegion.name);
  });

  it('update should modify a region', async () => {
    const region: RegionEntity = RegionsList[0];
    region.name = 'New name';

    const updatedRegion: RegionEntity = await service.update(region.id, region);
    expect(updatedRegion).not.toBeNull();

    const storedRegion: RegionEntity = await repository.findOne({
      where: { id: region.id },
    });
    expect(storedRegion).not.toBeNull();
    expect(storedRegion.name).toEqual(region.name);
  });

  it('update should throw an exception for an invalid region', async () => {
    let region: RegionEntity = RegionsList[0];
    region = {
      ...region,
      name: 'New name',
    };
    await expect(() => service.update('0', region)).rejects.toHaveProperty(
      'message',
      'The region with the given id was not found',
    );
  });

  it('delete should remove a region', async () => {
    const region: RegionEntity = RegionsList[0];
    await service.delete(region.id);

    const deletedRegion: RegionEntity = await repository.findOne({
      where: { id: region.id},
    });
    expect(deletedRegion).toBeNull();
  });

  it('delete should throw an exception for an invalid region', async () => {
    const region: RegionEntity = RegionsList[0];
    await service.delete(region.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The region with the given id was not found',
    );
  });
});
