import { Test, TestingModule } from '@nestjs/testing';
import { RegionEntity } from '../region/region.entity';
import { Repository } from 'typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CultureRegionService } from '../culture-region/culture-region.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('Culture Region Service', () => {
  let service: CultureRegionService;
  let cultureRepository: Repository<CultureEntity>;
  let regionRepository: Repository<RegionEntity>;
  let culture: CultureEntity;
  let regionsList: RegionEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CultureRegionService],
    }).compile();

    service = module.get<CultureRegionService>(CultureRegionService);
    cultureRepository = module.get<Repository<CultureEntity>>(
      getRepositoryToken(CultureEntity),
    );
    regionRepository = module.get<Repository<RegionEntity>>(
      getRepositoryToken(RegionEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    regionRepository.clear();
    cultureRepository.clear();

    regionsList = [];
    for (let i = 0; i < 5; i++) {
      const region: RegionEntity = await regionRepository.save({
        name: faker.company.name(),
      });
      regionsList.push(region);
    }

    culture = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      regions: regionsList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addRegionCulture should add an region to a culture', async () => {
    const newRegion: RegionEntity = await regionRepository.save({
      name: faker.company.name(),
    });

    const newCulture: CultureEntity = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    });

    const result: CultureEntity = await service.addRegionCulture(
      newCulture.id,
      newRegion.id,
    );

    expect(result.regions.length).toBe(1);
    expect(result.regions[0]).not.toBeNull();
    expect(result.regions[0].name).toBe(newRegion.name);
  });

  it('addRegionCulture should thrown exception for an invalid region', async () => {
    const newCulture: CultureEntity = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addRegionCulture(newCulture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The region with the given id was not found',
    );
  });

  it('addRegionCulture should throw an exception for an invalid culture', async () => {
    const newRegion: RegionEntity = await regionRepository.save({
      name: faker.company.name(),
    });

    await expect(() =>
      service.addRegionCulture('0', newRegion.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('findRegionByCultureIdRegionId should return region by culture', async () => {
    const region: RegionEntity = regionsList[0];
    const storedregion: RegionEntity =
      await service.findRegionByCultureIdRegionId(culture.id, region.id);
    expect(storedregion).not.toBeNull();
    expect(storedregion.name).toBe(region.name);
  });

  it('findRegionByCultureIdRegionId should throw an exception for an invalid region', async () => {
    await expect(() =>
      service.findRegionByCultureIdRegionId(culture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The region with the given id was not found',
    );
  });

  it('findRegionByCultureIdRegionId should throw an exception for an invalid culture', async () => {
    const region: RegionEntity = regionsList[0];
    await expect(() =>
      service.findRegionByCultureIdRegionId('0', region.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('findRegionByCultureIdRegionId should throw an exception for an region not associated to the culture', async () => {
    const newRegion: RegionEntity = await regionRepository.save({
      name: faker.company.name(),
    });

    await expect(() =>
      service.findRegionByCultureIdRegionId(culture.id, newRegion.id),
    ).rejects.toHaveProperty(
      'message',
      'The region with the given id is not associated to the culture',
    );
  });

  it('findRegionsByCultureId should return regions by culture', async () => {
    const regions: RegionEntity[] = await service.findRegionsByCultureId(
      culture.id,
    );
    expect(regions.length).toBe(5);
  });

  it('findRegionsByCultureId should throw an exception for an invalid culture', async () => {
    await expect(() =>
      service.findRegionsByCultureId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('associateRegionsCulture should update regions list for a culture', async () => {
    const newRegion: RegionEntity = await regionRepository.save({
      name: faker.company.name(),
    });

    const updatedculture: CultureEntity = await service.associateRegionsCulture(
      culture.id,
      [newRegion],
    );
    expect(updatedculture.regions.length).toBe(1);

    expect(updatedculture.regions[0].name).toBe(newRegion.name);
  });

  it('associateRegionsCulture should throw an exception for an invalid culture', async () => {
    const newRegion: RegionEntity = await regionRepository.save({
      name: faker.company.name(),
    });

    await expect(() =>
      service.associateRegionsCulture('0', [newRegion]),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('associateRegionsCulture should throw an exception for an invalid region', async () => {
    const newRegion: RegionEntity = regionsList[0];
    newRegion.id = '0';

    await expect(() =>
      service.associateRegionsCulture(culture.id, [newRegion]),
    ).rejects.toHaveProperty(
      'message',
      'The region with the given id was not found',
    );
  });

  it('deleteRegionToCulture should remove an region from a culture', async () => {
    const region: RegionEntity = regionsList[0];

    await service.deleteRegionCulture(culture.id, region.id);

    const storedculture: CultureEntity = await cultureRepository.findOne({
      where: { id: `${culture.id}` },
      relations: ['regions'],
    });
    const deletedregion: RegionEntity = storedculture.regions.find(
      (a) => a.id === region.id,
    );

    expect(deletedregion).toBeUndefined();
  });

  it('deleteRegionToCulture should thrown an exception for an invalid region', async () => {
    await expect(() =>
      service.deleteRegionCulture(culture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The region with the given id was not found',
    );
  });

  it('deleteRegionToCulture should thrown an exception for an invalid culture', async () => {
    const region: RegionEntity = regionsList[0];
    await expect(() =>
      service.deleteRegionCulture('0', region.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('deleteRegionToCulture should thrown an exception for an non asocciated region', async () => {
    const newRegion: RegionEntity = await regionRepository.save({
      name: faker.company.name(),
    });

    await expect(() =>
      service.deleteRegionCulture(culture.id, newRegion.id),
    ).rejects.toHaveProperty(
      'message',
      'The region with the given id is not associated to the culture',
    );
  });
});
