import { CultureEntity } from '../culture/culture.entity';
import { RegionEntity } from '../region/region.entity';
import { CityEntity } from '../city/city.entity';
export declare class CountryEntity {
    id: string;
    name: string;
    location: string;
    cities: CityEntity[];
    regions: RegionEntity;
    cultures: CultureEntity[];
}
