import { CountryDto } from './country.dto';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    findAll(): Promise<CountryEntity[]>;
    findOne(countryId: string): Promise<CountryEntity>;
    create(countryDto: CountryDto): Promise<CountryEntity>;
    update(countryId: string, countryDto: CountryDto): Promise<CountryEntity>;
    delete(countryId: string): Promise<void>;
}
