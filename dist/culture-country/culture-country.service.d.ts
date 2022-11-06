import { Repository } from 'typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { CountryEntity } from '../country/country.entity';
export declare class CultureCountryService {
    private readonly cultureRepository;
    private readonly countryRepository;
    constructor(cultureRepository: Repository<CultureEntity>, countryRepository: Repository<CountryEntity>);
    addCountryCulture(cultureId: string, countryId: string): Promise<CultureEntity>;
    findCountryByCultureIdCountryId(cultureId: string, countryId: string): Promise<CountryEntity>;
    findCountriesByCultureId(cultureId: string): Promise<CountryEntity[]>;
    associateCountriesCulture(cultureId: string, countries: CountryEntity[]): Promise<CultureEntity>;
    deleteCountryCulture(cultureId: string, countryId: string): Promise<void>;
}
