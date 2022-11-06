import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from '../country/country.entity';
import { RegionEntity } from '../region/region.entity';
import { RecipeEntity } from '../recipe/recipe.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CultureEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(type => [RegionEntity])
  @OneToMany(() => RegionEntity, (region) => region.cultures)
  regions: RegionEntity[];
  
  @OneToMany(() => RecipeEntity, (recipe) => recipe.cultures)
  recipes: RecipeEntity[];

  @Field(type => [CountryEntity])
  @ManyToMany(() => CountryEntity, (country) => country.cultures)
  @JoinTable()
  countries: CountryEntity[];
}
