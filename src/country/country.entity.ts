import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { RegionEntity } from '../region/region.entity';
import { CityEntity } from '../city/city.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CountryEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    type: String,
    nullable: true,
  })
  location!: string;

  @OneToMany(() => CityEntity, (city) => city.countries)
  cities: CityEntity[];

  @ManyToOne(() => RegionEntity, (region) => region.countries)
  regions: RegionEntity;

  @Field(type => [CultureEntity])
  @ManyToMany(() => CultureEntity, (culture) => culture.countries)
  cultures: CultureEntity[];
}
