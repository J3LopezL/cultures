import { RegionService } from './region.service';
import { RegionEntity } from './region.entity';
import { RegionDto } from './region.dto';
export declare class RegionResolver {
    private regionService;
    constructor(regionService: RegionService);
    regions(): Promise<RegionEntity[]>;
    region(id: string): Promise<RegionEntity>;
    createRegion(regionDto: RegionDto): Promise<RegionEntity>;
    updateRegion(id: string, regionDto: RegionDto): Promise<RegionEntity>;
    deleteRegion(id: string): string;
}
