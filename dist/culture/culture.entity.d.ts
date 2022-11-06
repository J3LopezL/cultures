import { CountryEntity } from '../country/country.entity';
import { RegionEntity } from '../region/region.entity';
import { RecipeEntity } from '../recipe/recipe.entity';
export declare class CultureEntity {
    id: string;
    name: string;
    description: string;
    regions: RegionEntity[];
    recipes: RecipeEntity[];
    countries: CountryEntity[];
}
