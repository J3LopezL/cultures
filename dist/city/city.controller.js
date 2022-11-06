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
exports.CityController = void 0;
const city_service_1 = require("./city.service");
const common_1 = require("@nestjs/common");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const city_dto_1 = require("./city.dto");
const city_entity_1 = require("./city.entity");
const class_transformer_1 = require("class-transformer");
let CityController = class CityController {
    constructor(CityService) {
        this.CityService = CityService;
    }
    async findAll() {
        return await this.CityService.findAll();
    }
    async findOne(cityId) {
        return await this.CityService.findOne(cityId);
    }
    async create(CityDto) {
        const restaurant = (0, class_transformer_1.plainToInstance)(city_entity_1.CityEntity, CityDto);
        return await this.CityService.create(restaurant);
    }
    async update(cityId, CityDto) {
        const restaurant = (0, class_transformer_1.plainToInstance)(city_entity_1.CityEntity, CityDto);
        return await this.CityService.update(cityId, restaurant);
    }
    async delete(cityId) {
        return await this.CityService.delete(cityId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':cityId'),
    __param(0, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_dto_1.CityDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':cityId'),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, city_dto_1.CityDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':cityId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "delete", null);
CityController = __decorate([
    (0, common_1.Controller)('cities'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
exports.CityController = CityController;
//# sourceMappingURL=city.controller.js.map