import { CountryDto } from 'src/country/country.dto';
import { CountryEntity } from 'src/country/country.entity';
import { CultureCountryService } from './culture-country.service';
export declare class CultureCountryController {
    private readonly cultureCountryService;
    constructor(cultureCountryService: CultureCountryService);
    addCountryCulture(cultureId: string, countryId: string): Promise<import("../culture/culture.entity").CultureEntity>;
    findCountriesByCultureId(cultureId: string): Promise<CountryEntity[]>;
    findCountryByCultureIdCountryId(cultureId: string, countryId: string): Promise<CountryEntity>;
    associateCountriesCulture(cultureId: string, countriesDto: CountryDto[]): Promise<import("../culture/culture.entity").CultureEntity>;
    deleteCountryCulture(cultureId: string, countryId: string): Promise<void>;
}
