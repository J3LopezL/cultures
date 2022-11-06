import { Repository } from 'typeorm';
import { CityEntity } from './city.entity';
export declare class CityService {
    private readonly cityRepository;
    constructor(cityRepository: Repository<CityEntity>);
    findAll(): Promise<CityEntity[]>;
    findOne(id: string): Promise<CityEntity>;
    create(city: CityEntity): Promise<CityEntity>;
    update(id: string, city: CityEntity): Promise<CityEntity>;
    delete(id: string): Promise<void>;
}
