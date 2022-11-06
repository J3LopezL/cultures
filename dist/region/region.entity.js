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
var RegionEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionEntity = void 0;
const typeorm_1 = require("typeorm");
const culture_entity_1 = require("../culture/culture.entity");
const country_entity_1 = require("../country/country.entity");
const city_entity_1 = require("../city/city.entity");
const graphql_1 = require("@nestjs/graphql");
let RegionEntity = RegionEntity_1 = class RegionEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RegionEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegionEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(type => [RegionEntity_1]),
    (0, typeorm_1.ManyToOne)(() => culture_entity_1.CultureEntity, (culture) => culture.regions),
    __metadata("design:type", culture_entity_1.CultureEntity)
], RegionEntity.prototype, "cultures", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => country_entity_1.CountryEntity, (country) => country.regions),
    __metadata("design:type", country_entity_1.CountryEntity)
], RegionEntity.prototype, "countries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => city_entity_1.CityEntity, (city) => city.regions),
    __metadata("design:type", city_entity_1.CityEntity)
], RegionEntity.prototype, "cities", void 0);
RegionEntity = RegionEntity_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], RegionEntity);
exports.RegionEntity = RegionEntity;
//# sourceMappingURL=region.entity.js.map