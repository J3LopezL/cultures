import { CityService } from './city.service';
import { CityDto } from './city.dto';
import { CityEntity } from './city.entity';
export declare class CityController {
    private readonly CityService;
    constructor(CityService: CityService);
    findAll(): Promise<CityEntity[]>;
    findOne(cityId: string): Promise<CityEntity>;
    create(CityDto: CityDto): Promise<CityEntity>;
    update(cityId: string, CityDto: CityDto): Promise<CityEntity>;
    delete(cityId: string): Promise<void>;
}
