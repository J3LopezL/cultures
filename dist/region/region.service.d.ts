import { Repository } from 'typeorm';
import { RegionEntity } from './region.entity';
export declare class RegionService {
    private readonly regionRepository;
    constructor(regionRepository: Repository<RegionEntity>);
    findAll(): Promise<RegionEntity[]>;
    findOne(id: string): Promise<RegionEntity>;
    create(region: RegionEntity): Promise<RegionEntity>;
    update(id: string, region: RegionEntity): Promise<RegionEntity>;
    delete(id: string): Promise<void>;
}
