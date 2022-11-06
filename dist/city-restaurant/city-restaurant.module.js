"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRestaurantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const city_restaurant_service_1 = require("./city-restaurant.service");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const city_entity_1 = require("../city/city.entity");
const city_restaurant_controller_1 = require("./city-restaurant.controller");
let CityRestaurantModule = class CityRestaurantModule {
};
CityRestaurantModule = __decorate([
    (0, common_1.Module)({
        providers: [city_restaurant_service_1.CityRestaurantService],
        imports: [typeorm_1.TypeOrmModule.forFeature([city_entity_1.CityEntity, restaurant_entity_1.RestaurantEntity])],
        controllers: [city_restaurant_controller_1.CityRestaurantController],
    })
], CityRestaurantModule);
exports.CityRestaurantModule = CityRestaurantModule;
//# sourceMappingURL=city-restaurant.module.js.map