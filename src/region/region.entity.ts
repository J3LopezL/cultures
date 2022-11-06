import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { CountryEntity } from '../country/country.entity';
import { CityEntity } from '../city/city.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class RegionEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(type => [RegionEntity])
  @ManyToOne(() => CultureEntity, (culture) => culture.regions)
  cultures: CultureEntity;

  @OneToMany(() => CountryEntity, (country) => country.regions)
  countries: CountryEntity;

  @OneToMany(() => CityEntity, (city) => city.regions)
  cities: CityEntity;
}
