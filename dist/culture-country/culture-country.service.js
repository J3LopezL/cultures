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
exports.CultureCountryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const culture_entity_1 = require("../culture/culture.entity");
const country_entity_1 = require("../country/country.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let CultureCountryService = class CultureCountryService {
    constructor(cultureRepository, countryRepository) {
        this.cultureRepository = cultureRepository;
        this.countryRepository = countryRepository;
    }
    async addCountryCulture(cultureId, countryId) {
        const country = await this.countryRepository.findOne({
            where: { id: countryId },
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culture = await this.cultureRepository.findOne({
            where: { id: cultureId },
            relations: ['countries'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        culture.countries = [...culture.countries, country];
        return await this.cultureRepository.save(culture);
    }
    async findCountryByCultureIdCountryId(cultureId, countryId) {
        const country = await this.countryRepository.findOne({
            where: { id: `${countryId}` },
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['countries'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cultureregion = culture.countries.find((e) => e.id === country.id);
        if (!cultureregion)
            throw new business_errors_1.BusinessLogicException('The country with the given id is not associated to the culture', business_errors_1.BusinessError.PRECONDITION_FAILED);
        return cultureregion;
    }
    async findCountriesByCultureId(cultureId) {
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['countries'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return culture.countries;
    }
    async associateCountriesCulture(cultureId, countries) {
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['countries'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        for (let i = 0; i < countries.length; i++) {
            const country = await this.countryRepository.findOne({
                where: { id: `${countries[i].id}` },
            });
            if (!country)
                throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        culture.countries = countries;
        return await this.cultureRepository.save(culture);
    }
    async deleteCountryCulture(cultureId, countryId) {
        const country = await this.countryRepository.findOne({
            where: { id: `${countryId}` },
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['countries'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cultureCountry = culture.countries.find((e) => e.id === country.id);
        if (!cultureCountry)
            throw new business_errors_1.BusinessLogicException('The country with the given id is not associated to the culture', business_errors_1.BusinessError.PRECONDITION_FAILED);
        culture.countries = culture.countries.filter((e) => e.id !== country.id);
        await this.cultureRepository.save(culture);
    }
};
CultureCountryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(culture_entity_1.CultureEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(country_entity_1.CountryEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], CultureCountryService);
exports.CultureCountryService = CultureCountryService;
//# sourceMappingURL=culture-country.service.js.map