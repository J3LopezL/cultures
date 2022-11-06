import { Repository } from 'typeorm';
import { CityEntity } from '../city/city.entity';
import { CountryEntity } from '../country/country.entity';
export declare class CountryCityService {
    private readonly cityRepository;
    private readonly countryRepository;
    constructor(cityRepository: Repository<CityEntity>, countryRepository: Repository<CountryEntity>);
    addCityCountry(countryId: string, cityId: string): Promise<CountryEntity>;
    findCityByCountryIdCityId(countryId: string, cityId: string): Promise<CityEntity>;
    findCityesByCountryId(countryId: string): Promise<CityEntity[]>;
    associateCityesCountry(countryId: string, cities: CityEntity[]): Promise<CountryEntity>;
    deleteCityCountry(countryId: string, cityId: string): Promise<void>;
}
