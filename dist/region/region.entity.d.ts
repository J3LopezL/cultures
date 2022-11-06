import { CultureEntity } from '../culture/culture.entity';
import { CountryEntity } from '../country/country.entity';
import { CityEntity } from '../city/city.entity';
export declare class RegionEntity {
    id: string;
    name: string;
    cultures: CultureEntity;
    countries: CountryEntity;
    cities: CityEntity;
}
