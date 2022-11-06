import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../city/city.entity';
import { CountryEntity } from '../country/country.entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class CountryCityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,

    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}
  async addCityCountry(
    countryId: string,
    cityId: string,
  ): Promise<CountryEntity> {
    const city: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: ['cities', 'regions'],
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    country.cities = [...country.cities, city];
    return await this.countryRepository.save(country);
  }

  async findCityByCountryIdCityId(
    countryId: string,
    cityId: string,
  ): Promise<CityEntity> {
    const city: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: ['cities'],
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cityCountry: CityEntity = country.cities.find(
      (e) => e.id === city.id,
    );

    if (!cityCountry)
      throw new BusinessLogicException(
        'The city with the given id is not associated to the country',
        BusinessError.PRECONDITION_FAILED,
      );

    return cityCountry;
  }

  async findCityesByCountryId(countryId: string): Promise<CityEntity[]> {
    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: ['cities'],
    });
    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return country.cities;
  }

  async associateCityesCountry(
    countryId: string,
    cities: CityEntity[],
  ): Promise<CountryEntity> {
    const country: CountryEntity = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: ['cities'],
    });

    if (!country)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < cities.length; i++) {
      const city: CityEntity = await this.cityRepository.findOne({
        where: { id: cities[i].id },
      });
      if (!city)
        throw new BusinessLogicException(
          'The city with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    country.cities = cities;
    return await this.countryRepository.save(country);
  }

  async deleteCityCountry(countryId: string, cityId: string) {
    const cityDeleted: CityEntity = await this.cityRepository.findOne({
      where: { id: cityId },
    });
    if (!cityDeleted)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const countryDeleted: CountryEntity = await this.countryRepository.findOne({
      where: { id: countryId },
      relations: ['cities'],
    });
    if (!countryDeleted)
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cityCountryD: CityEntity = countryDeleted.cities.find(
      (e) => e.id === cityDeleted.id,
    );

    if (!cityCountryD)
      throw new BusinessLogicException(
        'The city with the given id is not associated to the country',
        BusinessError.PRECONDITION_FAILED,
      );
    countryDeleted.cities = countryDeleted.cities.filter(
      (e) => e.id !== cityId,
    );
    await this.countryRepository.save(countryDeleted);
  }
}
