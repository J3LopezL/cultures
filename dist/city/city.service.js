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
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("./city.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let CityService = class CityService {
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }
    async findAll() {
        return await this.cityRepository.find({
            relations: ['countries', 'regions', 'restaurants'],
        });
    }
    async findOne(id) {
        const city = await this.cityRepository.findOne({
            where: { id },
            relations: ['countries', 'regions', 'restaurants'],
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return city;
    }
    async create(city) {
        return await this.cityRepository.save(city);
    }
    async update(id, city) {
        const persistedcity = await this.cityRepository.findOne({
            where: { id },
        });
        if (!persistedcity)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        city.id = id;
        return await this.cityRepository.save(city);
    }
    async delete(id) {
        const city = await this.cityRepository.findOne({
            where: { id },
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        await this.cityRepository.remove(city);
    }
};
CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.CityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CityService);
exports.CityService = CityService;
//# sourceMappingURL=city.service.js.map