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
exports.CultureCountryController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_enum_1 = require("../auth/roles.enum");
const country_entity_1 = require("../country/country.entity");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const culture_country_service_1 = require("./culture-country.service");
let CultureCountryController = class CultureCountryController {
    constructor(cultureCountryService) {
        this.cultureCountryService = cultureCountryService;
    }
    async addCountryCulture(cultureId, countryId) {
        return this.cultureCountryService.addCountryCulture(cultureId, countryId);
    }
    async findCountriesByCultureId(cultureId) {
        return this.cultureCountryService.findCountriesByCultureId(cultureId);
    }
    async findCountryByCultureIdCountryId(cultureId, countryId) {
        return this.cultureCountryService.findCountryByCultureIdCountryId(cultureId, countryId);
    }
    async associateCountriesCulture(cultureId, countriesDto) {
        const countries = (0, class_transformer_1.plainToInstance)(country_entity_1.CountryEntity, countriesDto);
        return await this.cultureCountryService.associateCountriesCulture(cultureId, countries);
    }
    async deleteCountryCulture(cultureId, countryId) {
        return await this.cultureCountryService.deleteCountryCulture(cultureId, countryId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(':cultureId/countries/:countryId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.WRITE_USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CultureCountryController.prototype, "addCountryCulture", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':cultureId/countries'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultureCountryController.prototype, "findCountriesByCultureId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':cultureId/countries/:countryId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CultureCountryController.prototype, "findCountryByCultureIdCountryId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)(':cultureId/countries'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.WRITE_USER),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], CultureCountryController.prototype, "associateCountriesCulture", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':cultureId/countries/:countryId'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.DELETE_USER),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('cultureId')),
    __param(1, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CultureCountryController.prototype, "deleteCountryCulture", null);
CultureCountryController = __decorate([
    (0, common_1.Controller)('cultures'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [culture_country_service_1.CultureCountryService])
], CultureCountryController);
exports.CultureCountryController = CultureCountryController;
//# sourceMappingURL=culture-country.controller.js.map