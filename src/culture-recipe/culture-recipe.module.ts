import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { CultureRecipeService } from './culture-recipe.service';
import { RecipeEntity } from '../recipe/recipe.entity';

@Module({
  providers: [CultureRecipeService],
  imports: [TypeOrmModule.forFeature([CultureEntity, RecipeEntity])],
  controllers: [],
})
export class CultureRecipeModule {}
