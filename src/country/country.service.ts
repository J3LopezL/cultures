/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CountryEntity } from './country.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class CountryService {
  cacheKey = "countries";
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<CountryEntity[]> {
    const cached: CountryEntity[] = await this.cacheManager.get<CountryEntity[]>(this.cacheKey);
    if(!cached) {
      const countries: CountryEntity[] = await this.countryRepository.find({
        relations: ['regions', 'cultures'],
      });
      await this.cacheManager.set(this.cacheKey, countries);
      return countries;
    }
    return cached;
  }

  async findOne(id: string): Promise<CountryEntity> {
    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id },
      relations: ['regions', 'cultures'],
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return country;
  }

  async create(country: CountryEntity): Promise<CountryEntity> {
    return await this.countryRepository.save(country);
  }

  async update(id: string, country: CountryEntity): Promise<CountryEntity> {
    const persistedcountry: CountryEntity =
      await this.countryRepository.findOne({ where: { id } });
    if (!persistedcountry)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    country.id = id;
    return await this.countryRepository.save({...persistedcountry, ...country});
  }

  async delete(id: string) {
    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id },
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.countryRepository.remove(country);
  }
}
