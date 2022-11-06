import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { CityEntity } from '../city/city.entity';

@Entity()
export class RestaurantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  stars: number;

  @Column()
  dateStars: Date;

  @Column()
  description: string;

  @ManyToOne(() => CityEntity, (city) => city.restaurants)
  cities: CityEntity;
}
