import { Repository } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';
export declare class RestaurantService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: Repository<RestaurantEntity>);
    findAll(): Promise<RestaurantEntity[]>;
    findOne(id: string): Promise<RestaurantEntity>;
    create(restaurant: RestaurantEntity): Promise<RestaurantEntity>;
    update(id: string, restaurant: RestaurantEntity): Promise<RestaurantEntity>;
    delete(id: string): Promise<void>;
}
