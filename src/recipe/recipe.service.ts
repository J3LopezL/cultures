import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RecipeEntity } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  async findAll(): Promise<RecipeEntity[]> {
    return await this.recipeRepository.find({
      relations: ['products', 'cultures'],
    });
  }

  async findOne(id: string): Promise<RecipeEntity> {
    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id },
      relations: ['products', 'cultures'],
    });
    if (!recipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return recipe;
  }

  async create(recipe: RecipeEntity): Promise<RecipeEntity> {
    return await this.recipeRepository.save(recipe);
  }

  async update(id: string, recipe: RecipeEntity): Promise<RecipeEntity> {
    const persistedrecipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id },
    });
    if (!persistedrecipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    recipe.id = id;

    return await this.recipeRepository.save(recipe);
  }

  async delete(id: string) {
    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id },
    });
    if (!recipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.recipeRepository.remove(recipe);
  }
}
