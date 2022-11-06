import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { RecipeEntity } from '../recipe/recipe.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class CultureRecipeService {
  constructor(
    @InjectRepository(CultureEntity)
    private readonly cultureRepository: Repository<CultureEntity>,

    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  async addrecipeCulture(
    cultureId: string,
    recipeId: string,
  ): Promise<CultureEntity> {
    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: `${recipeId}` },
    });
    if (!recipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['recipes'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    culture.recipes = [...culture.recipes, recipe];
    return await this.cultureRepository.save(culture);
  }

  async findrecipeByCultureIdrecipeId(
    cultureId: string,
    recipeId: string,
  ): Promise<RecipeEntity> {
    const recipe: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: `${recipeId}` },
    });
    if (!recipe)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['recipes'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culturerecipe: RecipeEntity = culture.recipes.find(
      (e) => e.id === recipe.id,
    );

    if (!culturerecipe)
      throw new BusinessLogicException(
        'The recipe with the given id is not associated to the culture',
        BusinessError.PRECONDITION_FAILED,
      );

    return culturerecipe;
  }

  async findrecipesByCultureId(cultureId: string): Promise<RecipeEntity[]> {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['recipes'],
    });
    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return culture.recipes;
  }

  async associaterecipesCulture(
    cultureId: string,
    recipes: RecipeEntity[],
  ): Promise<CultureEntity> {
    const culture: CultureEntity = await this.cultureRepository.findOne({
      where: { id: `${cultureId}` },
      relations: ['recipes'],
    });

    if (!culture)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < recipes.length; i++) {
      const recipe: RecipeEntity = await this.recipeRepository.findOne({
        where: { id: `${recipes[i].id}` },
      });
      if (!recipe)
        throw new BusinessLogicException(
          'The recipe with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    culture.recipes = recipes;
    return await this.cultureRepository.save(culture);
  }

  async deleterecipeCulture(cultureId: string, recipeId: string) {
    const recipeDeleted: RecipeEntity = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!recipeDeleted)
      throw new BusinessLogicException(
        'The recipe with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const cultureDeleted: CultureEntity = await this.cultureRepository.findOne({
      where: { id: cultureId },
      relations: ['recipes'],
    });
    if (!cultureDeleted)
      throw new BusinessLogicException(
        'The culture with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const culturerecipeD: RecipeEntity = cultureDeleted.recipes.find(
      (e) => e.id === recipeDeleted.id,
    );

    if (!culturerecipeD)
      throw new BusinessLogicException(
        'The recipe with the given id is not associated to the culture',
        BusinessError.PRECONDITION_FAILED,
      );

    cultureDeleted.recipes = cultureDeleted.recipes.filter(
      (e) => e.id !== recipeId,
    );
    await this.cultureRepository.save(cultureDeleted);
  }
}
