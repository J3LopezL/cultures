import { RegionDto } from './region.dto';
import { RegionEntity } from './region.entity';
import { RegionService } from './region.service';
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    findAll(): Promise<RegionEntity[]>;
    findOne(regionId: string): Promise<RegionEntity>;
    create(regionDto: RegionDto): Promise<RegionEntity>;
    update(regionId: string, regionDto: RegionDto): Promise<RegionEntity>;
    delete(regionId: string): Promise<void>;
}
