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
exports.CountryCityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("../city/city.entity");
const country_entity_1 = require("../country/country.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let CountryCityService = class CountryCityService {
    constructor(cityRepository, countryRepository) {
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
    }
    async addCityCountry(countryId, cityId) {
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const country = await this.countryRepository.findOne({
            where: { id: countryId },
            relations: ['cities', 'regions'],
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        country.cities = [...country.cities, city];
        return await this.countryRepository.save(country);
    }
    async findCityByCountryIdCityId(countryId, cityId) {
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
        });
        if (!city)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const country = await this.countryRepository.findOne({
            where: { id: countryId },
            relations: ['cities'],
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cityCountry = country.cities.find((e) => e.id === city.id);
        if (!cityCountry)
            throw new business_errors_1.BusinessLogicException('The city with the given id is not associated to the country', business_errors_1.BusinessError.PRECONDITION_FAILED);
        return cityCountry;
    }
    async findCityesByCountryId(countryId) {
        const country = await this.countryRepository.findOne({
            where: { id: countryId },
            relations: ['cities'],
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return country.cities;
    }
    async associateCityesCountry(countryId, cities) {
        const country = await this.countryRepository.findOne({
            where: { id: countryId },
            relations: ['cities'],
        });
        if (!country)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        for (let i = 0; i < cities.length; i++) {
            const city = await this.cityRepository.findOne({
                where: { id: cities[i].id },
            });
            if (!city)
                throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        country.cities = cities;
        return await this.countryRepository.save(country);
    }
    async deleteCityCountry(countryId, cityId) {
        const cityDeleted = await this.cityRepository.findOne({
            where: { id: cityId },
        });
        if (!cityDeleted)
            throw new business_errors_1.BusinessLogicException('The city with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const countryDeleted = await this.countryRepository.findOne({
            where: { id: countryId },
            relations: ['cities'],
        });
        if (!countryDeleted)
            throw new business_errors_1.BusinessLogicException('The country with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cityCountryD = countryDeleted.cities.find((e) => e.id === cityDeleted.id);
        if (!cityCountryD)
            throw new business_errors_1.BusinessLogicException('The city with the given id is not associated to the country', business_errors_1.BusinessError.PRECONDITION_FAILED);
        countryDeleted.cities = countryDeleted.cities.filter((e) => e.id !== cityId);
        await this.countryRepository.save(countryDeleted);
    }
};
CountryCityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.CityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(country_entity_1.CountryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CountryCityService);
exports.CountryCityService = CountryCityService;
//# sourceMappingURL=country-city.service.js.map