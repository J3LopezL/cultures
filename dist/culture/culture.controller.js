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
exports.CultureController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const culture_dto_1 = require("./culture.dto");
const culture_entity_1 = require("./culture.entity");
const culture_service_1 = require("./culture.service");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_enum_1 = require("../auth/roles.enum");
let CultureController = class CultureController {
    constructor(cultureService) {
        this.cultureService = cultureService;
    }
    async findAll() {
        return await this.cultureService.findAll();
    }
    async findOne(cultureId) {
        return await this.cultureService.findOne(cultureId);
    }
    async create(cultureDto) {
        const culture = (0, class_transformer_1.plainToInstance)(culture_entity_1.CultureEntity, cultureDto);
        return await this.cultureService.create(culture);
    }
    async update(cultureId, cultureDto) {
        const culture = (0, class_transformer_1.plainToInstance)(culture_entity_1.CultureEntity, cultureDto);
        return await this.cultureService.update(cultureId, culture);
    }
    async delete(cultureId) {
        return await this.cultureService.delete(cultureId);
    }
};
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CultureController.prototype, "findAll", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':cultureId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER, roles_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultureController.prototype, "findOne", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [culture_dto_1.CultureDto]),
    __metadata("design:returntype", Promise)
], CultureController.prototype, "create", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)(':cultureId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, culture_dto_1.CultureDto]),
    __metadata("design:returntype", Promise)
], CultureController.prototype, "update", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':cultureId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('cultureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultureController.prototype, "delete", null);
CultureController = __decorate([
    (0, common_1.Controller)('cultures'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [culture_service_1.CultureService])
], CultureController);
exports.CultureController = CultureController;
//# sourceMappingURL=culture.controller.js.map