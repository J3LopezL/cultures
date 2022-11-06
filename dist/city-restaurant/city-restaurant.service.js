"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const city_entity_1 = require("../city/city.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let CityRestaurantService = class CityRestaurantService {
    constructor(restaurantRepository, cityRepository) {
        this.restaurantRepository = restaurantRepository;
        this.cityRepository = cityRepository;
    }
    async addRestaurantCity(cityId, restaurantId) {
        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
        if (!restaurant)
            throw new business_errors_1.BusinessLogicException('The restaurant with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
            relations: ['countries', 'regions', 'restaurants'],
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        city.restaurants = [...city.restaurants, restaurant];
        return await this.cityRepository.save(city);
    }
    async findRestaurantByCityIdRestaurantId(cityId, restaurantId) {
        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
        if (!restaurant)
            throw new business_errors_1.BusinessLogicException('The restaurant with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
            relations: ['restaurants'],
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cityRestaurant = city.restaurants.find((e) => e.id === restaurant.id);
        if (!cityRestaurant)
            throw new business_errors_1.BusinessLogicException('The restaurant with the given id is not associated to the city', business_errors_1.BusinessError.PRECONDITION_FAILED);
        return cityRestaurant;
    }
    async findRestaurantsByCityId(cityId) {
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
            relations: ['restaurants'],
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return city.restaurants;
    }
    async associateRestaurantsCity(cityId, restaurants) {
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
            relations: ['restaurants'],
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        for (let i = 0; i < restaurants.length; i++) {
            const restaurant = await this.restaurantRepository.findOne({
                where: { id: restaurants[i].id },
            });
            if (!restaurant)
                throw new business_errors_1.BusinessLogicException('The restaurant with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        city.restaurants = restaurants;
        return await this.cityRepository.save(city);
    }
    async deleteRestaurantCity(cityId, restaurantId) {
        const restaurantDeleted = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
        if (!restaurantDeleted)
            throw new business_errors_1.BusinessLogicException('The restaurant with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cityDeleted = await this.cityRepository.findOne({
            where: { id: cityId },
            relations: ['restaurants'],
        });
        if (!cityDeleted)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cityRestaurantD = cityDeleted.restaurants.find((e) => e.id === restaurantDeleted.id);
        if (!cityRestaurantD)
            throw new business_errors_1.BusinessLogicException('The restaurant with the given id is not associated to the city', business_errors_1.BusinessError.PRECONDITION_FAILED);
        cityDeleted.restaurants = cityDeleted.restaurants.filter((e) => e.id !== restaurantId);
        await this.cityRepository.save(cityDeleted);
    }
};
CityRestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.RestaurantEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(city_entity_1.CityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CityRestaurantService);
exports.CityRestaurantService = CityRestaurantService;
//# sourceMappingURL=city-restaurant.service.js.map