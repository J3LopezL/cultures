"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultureRecipeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const culture_entity_1 = require("../culture/culture.entity");
const culture_recipe_service_1 = require("./culture-recipe.service");
const recipe_entity_1 = require("../recipe/recipe.entity");
let CultureRecipeModule = class CultureRecipeModule {
};
CultureRecipeModule = __decorate([
    (0, common_1.Module)({
        providers: [culture_recipe_service_1.CultureRecipeService],
        imports: [typeorm_1.TypeOrmModule.forFeature([culture_entity_1.CultureEntity, recipe_entity_1.RecipeEntity])],
        controllers: [],
    })
], CultureRecipeModule);
exports.CultureRecipeModule = CultureRecipeModule;
//# sourceMappingURL=culture-recipe.module.js.map