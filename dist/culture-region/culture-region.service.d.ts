import { Repository } from 'typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { RegionEntity } from '../region/region.entity';
export declare class CultureRegionService {
    private readonly cultureRepository;
    private readonly regionRepository;
    constructor(cultureRepository: Repository<CultureEntity>, regionRepository: Repository<RegionEntity>);
    addRegionCulture(cultureId: string, regionId: string): Promise<CultureEntity>;
    findRegionByCultureIdRegionId(cultureId: string, regionId: string): Promise<RegionEntity>;
    findRegionsByCultureId(cultureId: string): Promise<RegionEntity[]>;
    associateRegionsCulture(cultureId: string, regions: RegionEntity[]): Promise<CultureEntity>;
    deleteRegionCulture(cultureId: string, regionId: string): Promise<void>;
}
