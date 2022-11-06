import { CultureEntity } from '../culture/culture.entity';
import { RecipeEntity } from '../recipe/recipe.entity';
import { Repository } from 'typeorm';
export declare class CultureRecipeService {
    private readonly cultureRepository;
    private readonly recipeRepository;
    constructor(cultureRepository: Repository<CultureEntity>, recipeRepository: Repository<RecipeEntity>);
    addrecipeCulture(cultureId: string, recipeId: string): Promise<CultureEntity>;
    findrecipeByCultureIdrecipeId(cultureId: string, recipeId: string): Promise<RecipeEntity>;
    findrecipesByCultureId(cultureId: string): Promise<RecipeEntity[]>;
    associaterecipesCulture(cultureId: string, recipes: RecipeEntity[]): Promise<CultureEntity>;
    deleterecipeCulture(cultureId: string, recipeId: string): Promise<void>;
}
