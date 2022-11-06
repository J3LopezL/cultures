import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './city.entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}
  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find({
      relations: ['countries', 'regions', 'restaurants'],
    });
  }

  async findOne(id: string): Promise<CityEntity> {
    const city: CityEntity = await this.cityRepository.findOne({
      where: { id },
      relations: ['countries', 'regions', 'restaurants'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return city;
  }

  async create(city: CityEntity): Promise<CityEntity> {
    return await this.cityRepository.save(city);
  }

  async update(id: string, city: CityEntity): Promise<CityEntity> {
    const persistedcity: CityEntity = await this.cityRepository.findOne({
      where: { id },
    });
    if (!persistedcity)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    city.id = id;

    return await this.cityRepository.save(city);
  }

  async delete(id: string) {
    const city: CityEntity = await this.cityRepository.findOne({
      where: { id },
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.cityRepository.remove(city);
  }
}
