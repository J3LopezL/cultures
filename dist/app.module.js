"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const culture_module_1 = require("./culture/culture.module");
const region_module_1 = require("./region/region.module");
const country_module_1 = require("./country/country.module");
const culture_region_module_1 = require("./culture-region/culture-region.module");
const culture_entity_1 = require("./culture/culture.entity");
const region_entity_1 = require("./region/region.entity");
const country_entity_1 = require("./country/country.entity");
const city_entity_1 = require("./city/city.entity");
const city_module_1 = require("./city/city.module");
const culture_country_module_1 = require("./culture-country/culture-country.module");
const restaurant_module_1 = require("./restaurant/restaurant.module");
const city_restaurant_module_1 = require("./city-restaurant/city-restaurant.module");
const restaurant_entity_1 = require("./restaurant/restaurant.entity");
const country_city_module_1 = require("./country-city/country-city.module");
const recipe_module_1 = require("./recipe/recipe.module");
const recipe_entity_1 = require("./recipe/recipe.entity");
const product_entity_1 = require("./product/product.entity");
const product_module_1 = require("./product/product.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const path_1 = require("path");
const culture_recipe_module_1 = require("./culture-recipe/culture-recipe.module");
const recipe_product_module_1 = require("./recipe-product/recipe-product.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            culture_module_1.CultureModule,
            region_module_1.RegionModule,
            city_module_1.CityModule,
            country_module_1.CountryModule,
            restaurant_module_1.RestaurantModule,
            recipe_module_1.RecipeModule,
            product_module_1.ProductModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'culture',
                entities: [
                    culture_entity_1.CultureEntity,
                    region_entity_1.RegionEntity,
                    city_entity_1.CityEntity,
                    country_entity_1.CountryEntity,
                    restaurant_entity_1.RestaurantEntity,
                    recipe_entity_1.RecipeEntity,
                    product_entity_1.ProductEntity,
                ],
                dropSchema: true,
                synchronize: true,
                keepConnectionAlive: true,
            }),
            culture_region_module_1.CultureRegionModule,
            culture_country_module_1.CultureCountryModule,
            culture_recipe_module_1.CultureRecipeModule,
            city_restaurant_module_1.CityRestaurantModule,
            country_city_module_1.CountryCityModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                driver: apollo_1.ApolloDriver
            }),
            recipe_product_module_1.RecipeProductModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map