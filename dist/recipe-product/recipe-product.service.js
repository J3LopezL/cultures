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
exports.RecipeProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recipe_entity_1 = require("../recipe/recipe.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let RecipeProductService = class RecipeProductService {
    constructor(recipeRepository, productRepository) {
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
    }
    async addProductRecipe(productId, recipeId) {
        const product = await this.productRepository.findOne({
            where: { id: `${recipeId}` },
        });
        if (!product)
            throw new business_errors_1.BusinessLogicException('The product with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const recipe = await this.recipeRepository.findOne({
            where: { id: `${productId}` },
            relations: ['products'],
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The product with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        recipe.products = [...recipe.products, product];
        return await this.recipeRepository.save(recipe);
    }
    async findProductByRecipeIdProductId(recipeId, productId) {
        const product = await this.productRepository.findOne({
            where: { id: `${productId}` },
        });
        if (!product)
            throw new business_errors_1.BusinessLogicException('The product with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const recipe = await this.recipeRepository.findOne({
            where: { id: `${recipeId}` },
            relations: ['products'],
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const recipeproduct = recipe.products.find((e) => e.id === product.id);
        if (!recipeproduct)
            throw new business_errors_1.BusinessLogicException('The product with the given id is not associated to the recipe', business_errors_1.BusinessError.PRECONDITION_FAILED);
        return recipeproduct;
    }
    async findProductsByRecipeId(recipeId) {
        const recipe = await this.recipeRepository.findOne({
            where: { id: `${recipeId}` },
            relations: ['products'],
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return recipe.products;
    }
    async associateProductsrecipe(recipeId, products) {
        const recipe = await this.recipeRepository.findOne({
            where: { id: `${recipeId}` },
            relations: ['products'],
        });
        if (!recipe)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        for (let i = 0; i < products.length; i++) {
            const product = await this.productRepository.findOne({
                where: { id: `${products[i].id}` },
            });
            if (!product)
                throw new business_errors_1.BusinessLogicException('The product with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        recipe.products = products;
        return await this.recipeRepository.save(recipe);
    }
    async deleteproductRecipe(recipeId, productId) {
        const productDeleted = await this.productRepository.findOne({
            where: { id: `${productId}` },
        });
        if (!productDeleted)
            throw new business_errors_1.BusinessLogicException('The product with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const recipeDeleted = await this.recipeRepository.findOne({
            where: { id: `${recipeId}` },
            relations: ['products'],
        });
        if (!recipeDeleted)
            throw new business_errors_1.BusinessLogicException('The recipe with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const recipeproductD = recipeDeleted.products.find((e) => e.id === productDeleted.id);
        if (!recipeproductD)
            throw new business_errors_1.BusinessLogicException('The product with the given id is not associated to the recipe', business_errors_1.BusinessError.PRECONDITION_FAILED);
        recipeDeleted.products = recipeDeleted.products.filter((e) => e.id !== productId);
        await this.recipeRepository.save(recipeDeleted);
    }
};
RecipeProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.RecipeEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RecipeProductService);
exports.RecipeProductService = RecipeProductService;
//# sourceMappingURL=recipe-product.service.js.map