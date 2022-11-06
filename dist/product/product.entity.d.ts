import { RecipeEntity } from '../recipe/recipe.entity';
export declare class ProductEntity {
    id: string;
    name: string;
    description: string;
    history: string;
    category: string;
    recipes: RecipeEntity;
}
