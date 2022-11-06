import { CultureRegionService } from './culture-region.service';
import { RegionEntity } from '../region/region.entity';
import { RegionDto } from '../region/region.dto';
export declare class CultureRegionController {
    private readonly cultureRegionService;
    constructor(cultureRegionService: CultureRegionService);
    addRegionCulture(cultureId: string, regionId: string): Promise<import("../culture/culture.entity").CultureEntity>;
    finRegionByCultureIdRegionId(cultureId: string, regionId: string): Promise<RegionEntity>;
    findRegionsByCultureId(cultureId: string): Promise<RegionEntity[]>;
    associateRegionsCulture(regionsDto: RegionDto[], cultureId: string): Promise<import("../culture/culture.entity").CultureEntity>;
    deleteRegionCulture(cultureId: string, regionId: string): Promise<void>;
}
