import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { RegionEntity } from '../region/region.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class CultureRegionService {
  constructor(
    @InjectRepository(CultureEntity)
    private readonly cultureRepository: Repository<CultureEntity>,

    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async addRegionCulture(
    cultureId: string,
    regionId: string,
  ): Promise<CultureEntity> {
    const region: RegionEntity = await this.regionRepository.findOne({
      where: { id: `${regionId}` },
    });
    if (!region)
      throw new BusinessLogicException(
        'The region with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['regions'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    culture.regions = [...culture.regions, region];
    return await this.cultureRepository.save(culture);
  }

  async findRegionByCultureIdRegionId(
    cultureId: string,
    regionId: string,
  ): Promise<RegionEntity> {
    const region: RegionEntity = await this.regionRepository.findOne({
      where: { id: `${regionId}` },
    });
    if (!region)
      throw new BusinessLogicException(
        'The region with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['regions'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cultureregion: RegionEntity = culture.regions.find(
      (e) => e.id === region.id,
    );

    if (!cultureregion)
      throw new BusinessLogicException(
        'The region with the given id is not associated to the culture',
        BusinessError.PRECONDITION_FAILED,
      );

    return cultureregion;
  }

  async findRegionsByCultureId(cultureId: string): Promise<RegionEntity[]> {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['regions'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return culture.regions;
  }

  async associateRegionsCulture(
    cultureId: string,
    regions: RegionEntity[],
  ): Promise<CultureEntity> {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['regions'],
    });

    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < regions.length; i++) {
      const region: RegionEntity = await this.regionRepository.findOne({
        where: { id: `${regions[i].id}` },
      });
      if (!region)
        throw new BusinessLogicException(
          'The region with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    culture.regions = regions;
    return await this.cultureRepository.save(culture);
  }

  async deleteRegionCulture(cultureId: string, regionId: string) {
    const regionDeleted: RegionEntity = await this.regionRepository.findOne({
      where: { id: `${regionId}` },
    });
    if (!regionDeleted)
      throw new BusinessLogicException(
        'The region with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cultureDeleted: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['regions'],
    });
    if (!cultureDeleted)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cultureRegionD: RegionEntity = cultureDeleted.regions.find(
      (e) => e.id === regionDeleted.id,
    );

    if (!cultureRegionD)
      throw new BusinessLogicException(
        'The region with the given id is not associated to the culture',
        BusinessError.PRECONDITION_FAILED,
      );

    cultureDeleted.regions = cultureDeleted.regions.filter(
      (e) => e.id !== regionId,
    );
    await this.cultureRepository.save(cultureDeleted);
  }
}
