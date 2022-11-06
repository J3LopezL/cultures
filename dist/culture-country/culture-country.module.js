"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultureCountryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const culture_country_service_1 = require("./culture-country.service");
const culture_entity_1 = require("../culture/culture.entity");
const country_entity_1 = require("../country/country.entity");
const culture_country_controller_1 = require("./culture-country.controller");
let CultureCountryModule = class CultureCountryModule {
};
CultureCountryModule = __decorate([
    (0, common_1.Module)({
        providers: [culture_country_service_1.CultureCountryService],
        imports: [typeorm_1.TypeOrmModule.forFeature([culture_entity_1.CultureEntity, country_entity_1.CountryEntity])],
        controllers: [culture_country_controller_1.CultureCountryController],
    })
], CultureCountryModule);
exports.CultureCountryModule = CultureCountryModule;
//# sourceMappingURL=culture-country.module.js.map