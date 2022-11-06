import { Repository } from 'typeorm';
import { CountryEntity } from './country.entity';
import { Cache } from 'cache-manager';
export declare class CountryService {
    private readonly countryRepository;
    private readonly cacheManager;
    cacheKey: string;
    constructor(countryRepository: Repository<CountryEntity>, cacheManager: Cache);
    findAll(): Promise<CountryEntity[]>;
    findOne(id: string): Promise<CountryEntity>;
    create(country: CountryEntity): Promise<CountryEntity>;
    update(id: string, country: CountryEntity): Promise<CountryEntity>;
    delete(id: string): Promise<void>;
}
