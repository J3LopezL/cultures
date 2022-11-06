import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CultureModule } from './culture/culture.module';
import { RegionModule } from './region/region.module';
import { CountryModule } from './country/country.module';
import { CultureRegionModule } from './culture-region/culture-region.module';
import { CultureEntity } from './culture/culture.entity';
import { RegionEntity } from './region/region.entity';
import { CountryEntity } from './country/country.entity';
import { CityEntity } from './city/city.entity';
import { CityModule } from './city/city.module';
import { CultureCountryModule } from './culture-country/culture-country.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CityRestaurantModule } from './city-restaurant/city-restaurant.module';
import { RestaurantEntity } from './restaurant/restaurant.entity';
import { CountryCityModule } from './country-city/country-city.module';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeEntity } from './recipe/recipe.entity';
import { ProductEntity } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { CultureRecipeModule } from './culture-recipe/culture-recipe.module';
import { RecipeProductModule } from './recipe-product/recipe-product.module';

@Module({
  imports: [
    CultureModule,
    RegionModule,
    CityModule,
    CountryModule,
    RestaurantModule,
    RecipeModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'culture',
      entities: [
        CultureEntity,
        RegionEntity,
        CityEntity,
        CountryEntity,
        RestaurantEntity,
        RecipeEntity,
        ProductEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    CultureRegionModule,
    CultureCountryModule,
    CultureRecipeModule,
    CityRestaurantModule,
    CountryCityModule,
    UserModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),
    RecipeProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
