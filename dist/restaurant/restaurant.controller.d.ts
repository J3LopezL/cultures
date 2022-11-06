import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from './restaurant.dto';
import { RestaurantEntity } from './restaurant.entity';
export declare class RestaurantController {
    private readonly RestaurantService;
    constructor(RestaurantService: RestaurantService);
    findAll(): Promise<RestaurantEntity[]>;
    findOne(restaurantId: string): Promise<RestaurantEntity>;
    create(RestaurantDto: RestaurantDto): Promise<RestaurantEntity>;
    update(restaurantId: string, RestaurantDto: RestaurantDto): Promise<RestaurantEntity>;
    delete(restaurantId: string): Promise<void>;
}
