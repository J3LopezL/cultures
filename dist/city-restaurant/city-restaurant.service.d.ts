import { Repository } from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { CityEntity } from '../city/city.entity';
export declare class CityRestaurantService {
    private readonly restaurantRepository;
    private readonly cityRepository;
    constructor(restaurantRepository: Repository<RestaurantEntity>, cityRepository: Repository<CityEntity>);
    addRestaurantCity(cityId: string, restaurantId: string): Promise<CityEntity>;
    findRestaurantByCityIdRestaurantId(cityId: string, restaurantId: string): Promise<RestaurantEntity>;
    findRestaurantsByCityId(cityId: string): Promise<RestaurantEntity[]>;
    associateRestaurantsCity(cityId: string, restaurants: RestaurantEntity[]): Promise<CityEntity>;
    deleteRestaurantCity(cityId: string, restaurantId: string): Promise<void>;
}
