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
exports.RestaurantController = void 0;
const restaurant_service_1 = require("./restaurant.service");
const common_1 = require("@nestjs/common");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const restaurant_dto_1 = require("./restaurant.dto");
const restaurant_entity_1 = require("./restaurant.entity");
const class_transformer_1 = require("class-transformer");
let RestaurantController = class RestaurantController {
    constructor(RestaurantService) {
        this.RestaurantService = RestaurantService;
    }
    async findAll() {
        return await this.RestaurantService.findAll();
    }
    async findOne(restaurantId) {
        return await this.RestaurantService.findOne(restaurantId);
    }
    async create(RestaurantDto) {
        const restaurant = (0, class_transformer_1.plainToInstance)(restaurant_entity_1.RestaurantEntity, RestaurantDto);
        return await this.RestaurantService.create(restaurant);
    }
    async update(restaurantId, RestaurantDto) {
        const restaurant = (0, class_transformer_1.plainToInstance)(restaurant_entity_1.RestaurantEntity, RestaurantDto);
        return await this.RestaurantService.update(restaurantId, restaurant);
    }
    async delete(restaurantId) {
        return await this.RestaurantService.delete(restaurantId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_dto_1.RestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, restaurant_dto_1.RestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':restaurantId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "delete", null);
RestaurantController = __decorate([
    (0, common_1.Controller)('restaurants'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map