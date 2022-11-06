import { TypeOrmModule } from '@nestjs/typeorm';

import { CultureEntity } from '../../culture/culture.entity';
import { RegionEntity } from '../..//region/region.entity';
import { CountryEntity } from '../..//country/country.entity';
import { CityEntity } from '../..//city/city.entity';
import { RestaurantEntity } from '../../restaurant/restaurant.entity';
import { ProductEntity } from '../../product/product.entity';
import { RecipeEntity } from '../../recipe/recipe.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      CultureEntity,
      RegionEntity,
      CountryEntity,
      CityEntity,
      RestaurantEntity,
      ProductEntity,
      RecipeEntity,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    CultureEntity,
    RegionEntity,
    CountryEntity,
    CityEntity,
    RestaurantEntity,
    ProductEntity,
    RecipeEntity,
  ]),
];
