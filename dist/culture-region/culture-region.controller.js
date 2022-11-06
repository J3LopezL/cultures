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
exports.CultureRegionController = void 0;
const common_1 = require("@nestjs/common");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const class_transformer_1 = require("class-transformer");
const culture_region_service_1 = require("./culture-region.service");
const region_entity_1 = require("../region/region.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const common_2 = require("@nestjs/common");
const roles_enum_1 = require("../auth/roles.enum");
let CultureRegionController = class CultureRegionController {
    constructor(cultureRegionService) {
        this.cultureRegionService = cultureRegionService;
    }
    async addRegionCulture(cultureId, regionId) {
        return await this.cultureRegionService.addRegionCulture(cultureId, regionId);
    }
    async finRegionByCultureIdRegionId(cultureId, regionId) {
        return await this.cultureRegionService.findRegionByCultureIdRegionId(cultureId, regionId);
    }
    async findRegionsByCultureId(cultureId) {
        return await this.cultureRegionService.findRegionsByCultureId(cultureId);
    }
    async associateRegionsCulture(regionsDto, cultureId) {
        const regions = (0, class_transformer_1.plainToInstance)(region_entity_1.RegionEntity, regionsDto);
        return await this.cultureRegionService.associateRegionsCulture(cultureId, regions);
    }
    async deleteRegionCulture(cultureId, regionId) {
        return await this.cultureRegionService.deleteRegionCulture(cultureId, regionId);
    }
};
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(':cultureId/regions/:regionId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER, roles_enum_1.Role.REGION_USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Param)('regionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CultureRegionController.prototype, "addRegionCulture", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':cultureId/regions/:regionId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER, roles_enum_1.Role.REGION_USER, roles_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Param)('regionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CultureRegionController.prototype, "finRegionByCultureIdRegionId", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':cultureId/regions'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER, roles_enum_1.Role.REGION_USER, roles_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultureRegionController.prototype, "findRegionsByCultureId", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)(':cultureId/regions'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER, roles_enum_1.Role.REGION_USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('cultureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], CultureRegionController.prototype, "associateRegionsCulture", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':cultureId/regions/:regionId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.CULTURE_USER, roles_enum_1.Role.REGION_USER),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Param)('regionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CultureRegionController.prototype, "deleteRegionCulture", null);
CultureRegionController = __decorate([
    (0, common_1.Controller)('cultures'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [culture_region_service_1.CultureRegionService])
], CultureRegionController);
exports.CultureRegionController = CultureRegionController;
//# sourceMappingURL=culture-region.controller.js.map