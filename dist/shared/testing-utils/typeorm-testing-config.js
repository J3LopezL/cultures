"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTestingConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const culture_entity_1 = require("../../culture/culture.entity");
const region_entity_1 = require("../..//region/region.entity");
const country_entity_1 = require("../..//country/country.entity");
const city_entity_1 = require("../..//city/city.entity");
const restaurant_entity_1 = require("../../restaurant/restaurant.entity");
const product_entity_1 = require("../../product/product.entity");
const recipe_entity_1 = require("../../recipe/recipe.entity");
const TypeOrmTestingConfig = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [
            culture_entity_1.CultureEntity,
            region_entity_1.RegionEntity,
            country_entity_1.CountryEntity,
            city_entity_1.CityEntity,
            restaurant_entity_1.RestaurantEntity,
            product_entity_1.ProductEntity,
            recipe_entity_1.RecipeEntity,
        ],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    typeorm_1.TypeOrmModule.forFeature([
        culture_entity_1.CultureEntity,
        region_entity_1.RegionEntity,
        country_entity_1.CountryEntity,
        city_entity_1.CityEntity,
        restaurant_entity_1.RestaurantEntity,
        product_entity_1.ProductEntity,
        recipe_entity_1.RecipeEntity,
    ]),
];
exports.TypeOrmTestingConfig = TypeOrmTestingConfig;
//# sourceMappingURL=typeorm-testing-config.js.map