import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeEntity } from '../recipe/recipe.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  history: string;

  @Column()
  category: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.products)
  recipes: RecipeEntity;
}
