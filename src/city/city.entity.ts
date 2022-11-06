import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { RegionEntity } from '../region/region.entity';

import { RestaurantEntity } from '../restaurant/restaurant.entity';

import { CountryEntity } from '../country/country.entity';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  climate: string;

  @ManyToOne(() => CountryEntity, (country) => country.cities)
  countries: CountryEntity;

  @ManyToOne(() => RegionEntity, (region) => region.cities)
  regions: RegionEntity;

  @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.cities)
  restaurants: RestaurantEntity[];
}
