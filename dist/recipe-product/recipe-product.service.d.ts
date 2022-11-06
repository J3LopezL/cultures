import { RecipeEntity } from '../recipe/recipe.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
export declare class RecipeProductService {
    private readonly recipeRepository;
    private readonly productRepository;
    constructor(recipeRepository: Repository<RecipeEntity>, productRepository: Repository<ProductEntity>);
    addProductRecipe(productId: string, recipeId: string): Promise<RecipeEntity>;
    findProductByRecipeIdProductId(recipeId: string, productId: string): Promise<ProductEntity>;
    findProductsByRecipeId(recipeId: string): Promise<ProductEntity[]>;
    associateProductsrecipe(recipeId: string, products: ProductEntity[]): Promise<RecipeEntity>;
    deleteproductRecipe(recipeId: string, productId: string): Promise<void>;
}
