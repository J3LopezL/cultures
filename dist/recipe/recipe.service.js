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
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("./recipe.entity");
let RecipeService = class RecipeService {
    constructor(recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    async findAll() {
        return await this.recipeRepository.find({
            relations: ['products', 'cultures'],
        });
    }
    async findOne(id) {
        const recipe = await this.recipeRepository.findOne({
            where: { id },
            relations: ['products', 'cultures'],
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return recipe;
    }
    async create(recipe) {
        return await this.recipeRepository.save(recipe);
    }
    async update(id, recipe) {
        const persistedrecipe = await this.recipeRepository.findOne({
            where: { id },
        });
        if (!persistedrecipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        recipe.id = id;
        return await this.recipeRepository.save(recipe);
    }
    async delete(id) {
        const recipe = await this.recipeRepository.findOne({
            where: { id },
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        await this.recipeRepository.remove(recipe);
    }
};
RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.RecipeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecipeService);
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map