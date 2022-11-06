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
exports.CultureRecipeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const culture_entity_1 = require("../culture/culture.entity");
const recipe_entity_1 = require("../recipe/recipe.entity");
const typeorm_2 = require("typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
let CultureRecipeService = class CultureRecipeService {
    constructor(cultureRepository, recipeRepository) {
        this.cultureRepository = cultureRepository;
        this.recipeRepository = recipeRepository;
    }
    async addrecipeCulture(cultureId, recipeId) {
        const recipe = await this.recipeRepository.findOne({
            where: { id: `${recipeId}` },
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['recipes'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        culture.recipes = [...culture.recipes, recipe];
        return await this.cultureRepository.save(culture);
    }
    async findrecipeByCultureIdrecipeId(cultureId, recipeId) {
        const recipe = await this.recipeRepository.findOne({
            where: { id: `${recipeId}` },
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['recipes'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culturerecipe = culture.recipes.find((e) => e.id === recipe.id);
        if (!culturerecipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id is not associated to the culture', business_errors_1.BusinessError.PRECONDITION_FAILED);
        return culturerecipe;
    }
    async findrecipesByCultureId(cultureId) {
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['recipes'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return culture.recipes;
    }
    async associaterecipesCulture(cultureId, recipes) {
        const culture = await this.cultureRepository.findOne({
            where: { id: `${cultureId}` },
            relations: ['recipes'],
        });
        if (!culture)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        for (let i = 0; i < recipes.length; i++) {
            const recipe = await this.recipeRepository.findOne({
                where: { id: `${recipes[i].id}` },
            });
            if (!recipe)
                throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        culture.recipes = recipes;
        return await this.cultureRepository.save(culture);
    }
    async deleterecipeCulture(cultureId, recipeId) {
        const recipeDeleted = await this.recipeRepository.findOne({
            where: { id: recipeId },
        });
        if (!recipeDeleted)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const cultureDeleted = await this.cultureRepository.findOne({
            where: { id: cultureId },
            relations: ['recipes'],
        });
        if (!cultureDeleted)
            throw new business_errors_1.BusinessLogicException('The culture with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const culturerecipeD = cultureDeleted.recipes.find((e) => e.id === recipeDeleted.id);
        if (!culturerecipeD)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id is not associated to the culture', business_errors_1.BusinessError.PRECONDITION_FAILED);
        cultureDeleted.recipes = cultureDeleted.recipes.filter((e) => e.id !== recipeId);
        await this.cultureRepository.save(cultureDeleted);
    }
};
CultureRecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(culture_entity_1.CultureEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.RecipeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CultureRecipeService);
exports.CultureRecipeService = CultureRecipeService;
//# sourceMappingURL=culture-recipe.service.js.map