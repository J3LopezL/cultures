"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModule = void 0;
const sqliteStore = require("cache-manager-sqlite");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const country_entity_1 = require("./country.entity");
const country_service_1 = require("./country.service");
const country_controller_1 = require("./country.controller");
const country_resolver_1 = require("./country.resolver");
let CountryModule = class CountryModule {
};
CountryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([country_entity_1.CountryEntity]), common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 5
                },
            })],
        providers: [country_service_1.CountryService, country_resolver_1.CountryResolver],
        controllers: [country_controller_1.CountryController],
    })
], CountryModule);
exports.CountryModule = CountryModule;
//# sourceMappingURL=country.module.js.map