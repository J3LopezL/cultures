import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { CultureEntity } from '../culture/culture.entity';

@Entity()
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  photoDish: string;

  @Column()
  time: number;

  @Column()
  partions: number;

  @Column()
  videoURL: string;

  @ManyToOne(() => CultureEntity, (culture) => culture.recipes)
  cultures: CultureEntity;

  @OneToMany(() => ProductEntity, (product) => product.recipes)
  products: ProductEntity[];
}
