import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeProductService } from './recipe-product.service';
import { RecipeEntity } from 'src/recipe/recipe.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  providers: [RecipeProductService],
  imports: [TypeOrmModule.forFeature([RecipeEntity, ProductEntity])],
  controllers: [],
})
export class RecipeProductModule {}
