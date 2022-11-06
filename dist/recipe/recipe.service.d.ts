import { Repository } from 'typeorm';
import { RecipeEntity } from './recipe.entity';
export declare class RecipeService {
    private readonly recipeRepository;
    constructor(recipeRepository: Repository<RecipeEntity>);
    findAll(): Promise<RecipeEntity[]>;
    findOne(id: string): Promise<RecipeEntity>;
    create(recipe: RecipeEntity): Promise<RecipeEntity>;
    update(id: string, recipe: RecipeEntity): Promise<RecipeEntity>;
    delete(id: string): Promise<void>;
}
