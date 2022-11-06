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
exports.CityRestaurantController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const city_restaurant_service_1 = require("./city-restaurant.service");
let CityRestaurantController = class CityRestaurantController {
    constructor(CityRestaurantService) {
        this.CityRestaurantService = CityRestaurantService;
    }
    async addTiendaProduct(cityId, restaurantId) {
        return await this.CityRestaurantService.addRestaurantCity(cityId, restaurantId);
    }
    async findTiendaBycityIdrestaurantId(cityId, restaurantId) {
        return await this.CityRestaurantService.findRestaurantByCityIdRestaurantId(cityId, restaurantId);
    }
    async findrestaurantsBycityId(cityId) {
        return await this.CityRestaurantService.findRestaurantsByCityId(cityId);
    }
    async associaterestaurantsProducto(restaurantsDto, cityId) {
        const restaurants = (0, class_transformer_1.plainToInstance)(restaurant_entity_1.RestaurantEntity, restaurantsDto);
        return await this.CityRestaurantService.associateRestaurantsCity(cityId, restaurants);
    }
    async deleteTiendaProducto(cityId, restaurantId) {
        return await this.CityRestaurantService.deleteRestaurantCity(cityId, restaurantId);
    }
};
__decorate([
    (0, common_1.Post)(':cityId/restaurants/:restaurantId'),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CityRestaurantController.prototype, "addTiendaProduct", null);
__decorate([
    (0, common_1.Get)(':cityId/restaurants/:restaurantId'),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CityRestaurantController.prototype, "findTiendaBycityIdrestaurantId", null);
__decorate([
    (0, common_1.Get)(':cityId/restaurants'),
    __param(0, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityRestaurantController.prototype, "findrestaurantsBycityId", null);
__decorate([
    (0, common_1.Put)(':cityId/restaurants'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], CityRestaurantController.prototype, "associaterestaurantsProducto", null);
__decorate([
    (0, common_1.Delete)(':cityId/restaurants/:restaurantId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CityRestaurantController.prototype, "deleteTiendaProducto", null);
CityRestaurantController = __decorate([
    (0, common_1.Controller)('cities'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [city_restaurant_service_1.CityRestaurantService])
], CityRestaurantController);
exports.CityRestaurantController = CityRestaurantController;
//# sourceMappingURL=city-restaurant.controller.js.map