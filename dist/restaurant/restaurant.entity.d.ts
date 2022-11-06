import { CityEntity } from '../city/city.entity';
export declare class RestaurantEntity {
    id: string;
    name: string;
    stars: number;
    dateStars: Date;
    description: string;
    cities: CityEntity;
}
