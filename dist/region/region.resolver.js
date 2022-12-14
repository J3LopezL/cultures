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
exports.RegionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const region_service_1 = require("./region.service");
const region_entity_1 = require("./region.entity");
const region_dto_1 = require("./region.dto");
const class_transformer_1 = require("class-transformer");
let RegionResolver = class RegionResolver {
    constructor(regionService) {
        this.regionService = regionService;
    }
    regions() {
        return this.regionService.findAll();
    }
    region(id) {
        return this.regionService.findOne(id);
    }
    createRegion(regionDto) {
        const region = (0, class_transformer_1.plainToInstance)(region_entity_1.RegionEntity, regionDto);
        return this.regionService.create(region);
    }
    updateRegion(id, regionDto) {
        const region = (0, class_transformer_1.plainToInstance)(region_entity_1.RegionEntity, regionDto);
        return this.regionService.update(id, region);
    }
    deleteRegion(id) {
        this.regionService.delete(id);
        return id;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [region_entity_1.RegionEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionResolver.prototype, "regions", null);
__decorate([
    (0, graphql_1.Query)(() => region_entity_1.RegionEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionResolver.prototype, "region", null);
__decorate([
    (0, graphql_1.Mutation)(() => region_entity_1.RegionEntity),
    __param(0, (0, graphql_1.Args)('region')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [region_dto_1.RegionDto]),
    __metadata("design:returntype", Promise)
], RegionResolver.prototype, "createRegion", null);
__decorate([
    (0, graphql_1.Mutation)(() => region_entity_1.RegionEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('region')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, region_dto_1.RegionDto]),
    __metadata("design:returntype", Promise)
], RegionResolver.prototype, "updateRegion", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegionResolver.prototype, "deleteRegion", null);
RegionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [region_service_1.RegionService])
], RegionResolver);
exports.RegionResolver = RegionResolver;
//# sourceMappingURL=region.resolver.js.map