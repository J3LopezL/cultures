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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryEntity = void 0;
const typeorm_1 = require("typeorm");
const culture_entity_1 = require("../culture/culture.entity");
const region_entity_1 = require("../region/region.entity");
const city_entity_1 = require("../city/city.entity");
const graphql_1 = require("@nestjs/graphql");
let CountryEntity = class CountryEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CountryEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CountryEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: String,
        nullable: true,
    }),
    __metadata("design:type", String)
], CountryEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => city_entity_1.CityEntity, (city) => city.countries),
    __metadata("design:type", Array)
], CountryEntity.prototype, "cities", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.RegionEntity, (region) => region.countries),
    __metadata("design:type", region_entity_1.RegionEntity)
], CountryEntity.prototype, "regions", void 0);
__decorate([
    (0, graphql_1.Field)(type => [culture_entity_1.CultureEntity]),
    (0, typeorm_1.ManyToMany)(() => culture_entity_1.CultureEntity, (culture) => culture.countries),
    __metadata("design:type", Array)
], CountryEntity.prototype, "cultures", void 0);
CountryEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], CountryEntity);
exports.CountryEntity = CountryEntity;
//# sourceMappingURL=country.entity.js.map