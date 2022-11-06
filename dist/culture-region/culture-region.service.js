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
exports.CultureRegionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const culture_entity_1 = require("../culture/culture.entity");
const region_entity_1 = require("../region/region.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let CultureRegionService = class CultureRegionService {
    constructor(cultureRepository, regionRepository) {
        this.cultureRepository = cultureRepository;
        this.regionRepository = regionRepository;
    }
    async addRegionCulture(cultureId, regionId) {
        const region = await this.regionRepository.findOne({
            where: { id: `${regionId}` },
        });
        if (!region)
            throw new business_errors_1.BusinessLogicException('The region with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['regions'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        culture.regions = [...culture.regions, region];
        return await this.cultureRepository.save(culture);
    }
    async findRegionByCultureIdRegionId(cultureId, regionId) {
        const region = await this.regionRepository.findOne({
            where: { id: `${regionId}` },
        });
        if (!region)
            throw new business_errors_1.BusinessLogicException('The region with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['regions'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cultureregion = culture.regions.find((e) => e.id === region.id);
        if (!cultureregion)
            throw new business_errors_1.BusinessLogicException('The region with the given id is not associated to the culture', business_errors_1.BusinessError.PRECONDITION_FAILED);
        return cultureregion;
    }
    async findRegionsByCultureId(cultureId) {
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['regions'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return culture.regions;
    }
    async associateRegionsCulture(cultureId, regions) {
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['regions'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        for (let i = 0; i < regions.length; i++) {
            const region = await this.regionRepository.findOne({
                where: { id: `${regions[i].id}` },
            });
            if (!region)
                throw new business_errors_1.BusinessLogicException('The region with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        culture.regions = regions;
        return await this.cultureRepository.save(culture);
    }
    async deleteRegionCulture(cultureId, regionId) {
        const regionDeleted = await this.regionRepository.findOne({
            where: { id: `${regionId}` },
        });
        if (!regionDeleted)
            throw new business_errors_1.BusinessLogicException('The region with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cultureDeleted = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['regions'],
        });
        if (!cultureDeleted)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cultureRegionD = cultureDeleted.regions.find((e) => e.id === regionDeleted.id);
        if (!cultureRegionD)
            throw new business_errors_1.BusinessLogicException('The region with the given id is not associated to the culture', business_errors_1.BusinessError.PRECONDITION_FAILED);
        cultureDeleted.regions = cultureDeleted.regions.filter((e) => e.id !== regionId);
        await this.cultureRepository.save(cultureDeleted);
    }
};
CultureRegionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(culture_entity_1.CultureEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(region_entity_1.RegionEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], CultureRegionService);
exports.CultureRegionService = CultureRegionService;
//# sourceMappingURL=culture-region.service.js.map