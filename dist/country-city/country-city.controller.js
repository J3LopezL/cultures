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
exports.CountryCityController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const city_entity_1 = require("../city/city.entity");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const country_city_service_1 = require("./country-city.service");
let CountryCityController = class CountryCityController {
    constructor(CountryCityService) {
        this.CountryCityService = CountryCityService;
    }
    async addTiendaProduct(countryId, cityId) {
        return await this.CountryCityService.addCityCountry(countryId, cityId);
    }
    async findTiendaBycountryIdcityId(countryId, cityId) {
        return await this.CountryCityService.findCityByCountryIdCityId(countryId, cityId);
    }
    async findcitiesBycountryId(countryId) {
        return await this.CountryCityService.findCityesByCountryId(countryId);
    }
    async associatecitiesProducto(citiesDto, countryId) {
        const cities = (0, class_transformer_1.plainToInstance)(city_entity_1.CityEntity, citiesDto);
        return await this.CountryCityService.associateCityesCountry(countryId, cities);
    }
    async deleteTiendaProducto(countryId, cityId) {
        return await this.CountryCityService.deleteCityCountry(countryId, cityId);
    }
};
__decorate([
    (0, common_1.Post)(':countryId/cities/:cityId'),
    __param(0, (0, common_1.Param)('countryId')),
    __param(1, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CountryCityController.prototype, "addTiendaProduct", null);
__decorate([
    (0, common_1.Get)(':countryId/cities/:cityId'),
    __param(0, (0, common_1.Param)('countryId')),
    __param(1, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CountryCityController.prototype, "findTiendaBycountryIdcityId", null);
__decorate([
    (0, common_1.Get)(':countryId/cities'),
    __param(0, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryCityController.prototype, "findcitiesBycountryId", null);
__decorate([
    (0, common_1.Put)(':countryId/cities'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], CountryCityController.prototype, "associatecitiesProducto", null);
__decorate([
    (0, common_1.Delete)(':countryId/cities/:cityId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('countryId')),
    __param(1, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CountryCityController.prototype, "deleteTiendaProducto", null);
CountryCityController = __decorate([
    (0, common_1.Controller)('countries'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [country_city_service_1.CountryCityService])
], CountryCityController);
exports.CountryCityController = CountryCityController;
//# sourceMappingURL=country-city.controller.js.map