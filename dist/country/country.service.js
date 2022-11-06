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
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
const typeorm_2 = require("typeorm");
const country_entity_1 = require("./country.entity");
let CountryService = class CountryService {
    constructor(countryRepository, cacheManager) {
        this.countryRepository = countryRepository;
        this.cacheManager = cacheManager;
        this.cacheKey = "countries";
    }
    async findAll() {
        const cached = await this.cacheManager.get(this.cacheKey);
        if (!cached) {
            const countries = await this.countryRepository.find({
                relations: ['regions', 'cultures'],
            });
            await this.cacheManager.set(this.cacheKey, countries);
            return countries;
        }
        return cached;
    }
    async findOne(id) {
        const country = await this.countryRepository.findOne({
            where: { id },
            relations: ['regions', 'cultures'],
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return country;
    }
    async create(country) {
        return await this.countryRepository.save(country);
    }
    async update(id, country) {
        const persistedcountry = await this.countryRepository.findOne({ where: { id } });
        if (!persistedcountry)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        country.id = id;
        return await this.countryRepository.save(Object.assign(Object.assign({}, persistedcountry), country));
    }
    async delete(id) {
        const country = await this.countryRepository.findOne({
            where: { id },
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        await this.countryRepository.remove(country);
    }
};
CountryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(country_entity_1.CountryEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], CountryService);
exports.CountryService = CountryService;
//# sourceMappingURL=country.service.js.map