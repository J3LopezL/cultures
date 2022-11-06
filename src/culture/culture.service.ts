/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultureEntity } from './culture.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class CultureService {
  cacheKey: string = "regions";
  constructor(
    @InjectRepository(CultureEntity)
    private readonly cultureRepository: Repository<CultureEntity>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  async findAll(): Promise<CultureEntity[]> {
    const cached: CultureEntity[] = await this.cacheManager.get<CultureEntity[]>(this.cacheKey);

    if(!cached){
      const cultures: CultureEntity[] = await this.cultureRepository.find({ relations: ["regions", "countries"] });
      await this.cacheManager.set(this.cacheKey, cultures);
      return cultures;
    }
    return cached;
  }

  async findOne(id: string): Promise<CultureEntity> {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id },
      relations: ['regions', 'countries'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return culture;
  }

  async create(culture: CultureEntity): Promise<CultureEntity> {
    return await this.cultureRepository.save(culture);
  }

  async update(id: string, culture: CultureEntity): Promise<CultureEntity> {
    const persistedCulture: CultureEntity =
      await this.cultureRepository.findOne({ where: { id } });
    if (!persistedCulture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    culture.id = id;

    return await this.cultureRepository.save(culture);
  }

  async delete(id: string) {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id },
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.cultureRepository.remove(culture);
  }
}
