import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    createRecipe(recipeEntity: RecipeEntity): Promise<RecipeEntity>;
    findRecipeId(recipeId: string): Promise<RecipeEntity>;
    findRecipes(): Promise<RecipeEntity[]>;
    updateRecipe(recipeEntity: RecipeEntity, recipeId: string): Promise<RecipeEntity>;
    deleteRecipe(recipeId: string): Promise<void>;
}
