"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultureModule = void 0;
const sqliteStore = require("cache-manager-sqlite");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const culture_entity_1 = require("./culture.entity");
const culture_service_1 = require("./culture.service");
const culture_controller_1 = require("./culture.controller");
const culture_resolver_1 = require("./culture.resolver");
let CultureModule = class CultureModule {
};
CultureModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([culture_entity_1.CultureEntity]), common_1.CacheModule.register(),
            common_1.CacheModule.register({
                store: sqliteStore,
                path: ':memory:',
                options: {
                    ttl: 5
                },
            })],
        providers: [culture_service_1.CultureService, culture_resolver_1.CultureResolver],
        controllers: [culture_controller_1.CultureController],
    })
], CultureModule);
exports.CultureModule = CultureModule;
//# sourceMappingURL=culture.module.js.map