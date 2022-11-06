"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryCityModule = void 0;
const common_1 = require("@nestjs/common");
const city_entity_1 = require("../city/city.entity");
const country_entity_1 = require("../country/country.entity");
const country_city_service_1 = require("./country-city.service");
const typeorm_1 = require("@nestjs/typeorm");
const country_city_controller_1 = require("./country-city.controller");
let CountryCityModule = class CountryCityModule {
};
CountryCityModule = __decorate([
    (0, common_1.Module)({
        providers: [country_city_service_1.CountryCityService],
        imports: [typeorm_1.TypeOrmModule.forFeature([country_entity_1.CountryEntity, city_entity_1.CityEntity])],
        controllers: [country_city_controller_1.CountryCityController],
    })
], CountryCityModule);
exports.CountryCityModule = CountryCityModule;
//# sourceMappingURL=country-city.module.js.map