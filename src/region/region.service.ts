import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RegionEntity } from './region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async findAll(): Promise<RegionEntity[]> {
    return await this.regionRepository.find({
      relations: ['countries', 'cities'],
    });
  }

  async findOne(id: string): Promise<RegionEntity> {
    const region: RegionEntity = await this.regionRepository.findOne({
      where: { id },
      relations: ['countries', 'cities'],
    });
    if (!region)
      throw new BusinessLogicException(
        'The region with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return region;
  }

  async create(region: RegionEntity): Promise<RegionEntity> {
    return await this.regionRepository.save(region);
  }

  async update(id: string, region: RegionEntity): Promise<RegionEntity> {
    const persistedregion: RegionEntity = await this.regionRepository.findOne({
      where: { id },
    });
    if (!persistedregion)
      throw new BusinessLogicException(
        'The region with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    region.id = id;

    return await this.regionRepository.save(region);
  }

  async delete(id: string) {
    const region: RegionEntity = await this.regionRepository.findOne({
      where: { id },
    });
    if (!region)
      throw new BusinessLogicException(
        'The region with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.regionRepository.remove(region);
  }
}
