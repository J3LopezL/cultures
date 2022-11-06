import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from '../recipe/recipe.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class RecipeProductService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async addProductRecipe(
    productId: string,
    recipeId: string,
  ): Promise<RecipeEntity> {
    const product: ProductEntity = await this.productRepository.findOne({
      where: { id: `${recipeId}` },
    });
    if (!product)
      throw new BusinessLogicException(
        'The product with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: `${productId}` },
      relations: ['products'],
    });
    if (!recipe)
      throw new BusinessLogicException(
        'The product with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    recipe.products = [...recipe.products, product];
    return await this.recipeRepository.save(recipe);
  }

  async findProductByRecipeIdProductId(
    recipeId: string,
    productId: string,
  ): Promise<ProductEntity> {
    const product: ProductEntity = await this.productRepository.findOne({
      where: { id: `${productId}` },
    });
    if (!product)
      throw new BusinessLogicException(
        'The product with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: `${recipeId}` },
      relations: ['products'],
    });
    if (!recipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const recipeproduct: ProductEntity = recipe.products.find(
      (e) => e.id === product.id,
    );

    if (!recipeproduct)
      throw new BusinessLogicException(
        'The product with the given id is not associated to the recipe',
        BusinessError.PRECONDITION_FAILED,
      );

    return recipeproduct;
  }

  async findProductsByRecipeId(recipeId: string): Promise<ProductEntity[]> {
    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: `${recipeId}` },
      relations: ['products'],
    });
    if (!recipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return recipe.products;
  }

  async associateProductsrecipe(
    recipeId: string,
    products: ProductEntity[],
  ): Promise<RecipeEntity> {
    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: `${recipeId}` },
      relations: ['products'],
    });

    if (!recipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < products.length; i++) {
      const product: ProductEntity = await this.productRepository.findOne({
        where: { id: `${products[i].id}` },
      });
      if (!product)
        throw new BusinessLogicException(
          'The product with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    recipe.products = products;
    return await this.recipeRepository.save(recipe);
  }

  async deleteproductRecipe(recipeId: string, productId: string) {
    const productDeleted: ProductEntity = await this.productRepository.findOne({
      where: { id: `${productId}` },
    });
    if (!productDeleted)
      throw new BusinessLogicException(
        'The product with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const recipeDeleted: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: `${recipeId}` },
      relations: ['products'],
    });
    if (!recipeDeleted)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const recipeproductD: ProductEntity = recipeDeleted.products.find(
      (e) => e.id === productDeleted.id,
    );

    if (!recipeproductD)
      throw new BusinessLogicException(
        'The product with the given id is not associated to the recipe',
        BusinessError.PRECONDITION_FAILED,
      );

    recipeDeleted.products = recipeDeleted.products.filter(
      (e) => e.id !== productId,
    );
    await this.recipeRepository.save(recipeDeleted);
  }
}
