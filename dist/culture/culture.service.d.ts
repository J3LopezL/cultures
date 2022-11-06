import { CultureEntity } from './culture.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
export declare class CultureService {
    private readonly cultureRepository;
    private readonly cacheManager;
    cacheKey: string;
    constructor(cultureRepository: Repository<CultureEntity>, cacheManager: Cache);
    findAll(): Promise<CultureEntity[]>;
    findOne(id: string): Promise<CultureEntity>;
    create(culture: CultureEntity): Promise<CultureEntity>;
    update(id: string, culture: CultureEntity): Promise<CultureEntity>;
    delete(id: string): Promise<void>;
}
