import { CountryDto } from './country.dto';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
export declare class CountryResolver {
    private countryService;
    constructor(countryService: CountryService);
    countries(): Promise<CountryEntity[]>;
    country(id: string): Promise<CountryEntity>;
    createCountry(countryDto: CountryDto): Promise<CountryEntity>;
    updateCountry(id: string, countryDto: CountryDto): Promise<CountryEntity>;
    deleteCountry(id: string): string;
}
