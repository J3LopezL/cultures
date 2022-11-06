/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { CountryEntity } from '../country/country.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class CultureCountryService {
  constructor(
    @InjectRepository(CultureEntity)
    private readonly cultureRepository: Repository<CultureEntity>,

    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async addCountryCulture(
    cultureId: string,
    countryId: string,
  ): Promise<CultureEntity> {
    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id: countryId },
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: cultureId },
      relations: ['countries'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    culture.countries = [...culture.countries, country];
    return await this.cultureRepository.save(culture);
  }

  async findCountryByCultureIdCountryId(
    cultureId: string,
    countryId: string,
  ): Promise<CountryEntity> {
    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id: `${countryId}` },
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['countries'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    const cultureregion: CountryEntity = culture.countries.find(
      (e) => e.id === country.id,
    );
    if (!cultureregion)
      throw new BusinessLogicException(
        'The country with the given id is not associated to the culture',
        BusinessError.PRECONDITION_FAILED,
      );
    return cultureregion;
  }

  async findCountriesByCultureId(cultureId: string): Promise<CountryEntity[]> {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['countries'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return culture.countries;
  }

  async associateCountriesCulture(
    cultureId: string,
    countries: CountryEntity[],
  ): Promise<CultureEntity> {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['countries'],
    });

    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < countries.length; i++) {
      const country: CountryEntity = await this.countryRepository.findOne({
        where: { id: `${countries[i].id}` },
      });
      if (!country)
        throw new BusinessLogicException(
          'The country with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    culture.countries = countries;
    return await this.cultureRepository.save(culture);
  }

  async deleteCountryCulture(cultureId: string, countryId: string) {
    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id: `${countryId}` },
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['countries'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cultureCountry: CountryEntity = culture.countries.find(
      (e) => e.id === country.id,
    );

    if (!cultureCountry)
      throw new BusinessLogicException(
        'The country with the given id is not associated to the culture',
        BusinessError.PRECONDITION_FAILED,
      );

    culture.countries = culture.countries.filter((e) => e.id !== country.id);
    await this.cultureRepository.save(culture);
  }
}
