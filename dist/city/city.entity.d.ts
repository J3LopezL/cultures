import { RegionEntity } from '../region/region.entity';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { CountryEntity } from '../country/country.entity';
export declare class CityEntity {
    id: string;
    name: string;
    climate: string;
    countries: CountryEntity;
    regions: RegionEntity;
    restaurants: RestaurantEntity[];
}
