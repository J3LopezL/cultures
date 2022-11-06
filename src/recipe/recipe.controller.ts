import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async createRecipe(@Body() recipeEntity: RecipeEntity) {
    return await this.recipeService.create(recipeEntity);
  }

  @Get(':recipeId')
  async findRecipeId(@Param('recipeId') recipeId: string) {
    return await this.recipeService.findOne(recipeId);
  }

  @Get()
  async findRecipes() {
    return await this.recipeService.findAll();
  }

  @Put(':recipeId')
  async updateRecipe(
    @Body() recipeEntity: RecipeEntity,
    @Param('recipeId') recipeId: string,
  ) {
    return await this.recipeService.update(recipeId, recipeEntity);
  }

  @Delete(':recipeId')
  @HttpCode(204)
  async deleteRecipe(@Param('recipeId') recipeId: string) {
    return await this.recipeService.delete(recipeId);
  }
}
