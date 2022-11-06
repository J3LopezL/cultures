import { RestaurantDto } from 'src/restaurant/restaurant.dto';
import { RestaurantEntity } from 'src/restaurant/restaurant.entity';
import { CityRestaurantService } from './city-restaurant.service';
export declare class CityRestaurantController {
    private readonly CityRestaurantService;
    constructor(CityRestaurantService: CityRestaurantService);
    addTiendaProduct(cityId: string, restaurantId: string): Promise<import("../city/city.entity").CityEntity>;
    findTiendaBycityIdrestaurantId(cityId: string, restaurantId: string): Promise<RestaurantEntity>;
    findrestaurantsBycityId(cityId: string): Promise<RestaurantEntity[]>;
    associaterestaurantsProducto(restaurantsDto: RestaurantDto[], cityId: string): Promise<import("../city/city.entity").CityEntity>;
    deleteTiendaProducto(cityId: string, restaurantId: string): Promise<void>;
}
