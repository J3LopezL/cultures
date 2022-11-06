import { ProductEntity } from '../product/product.entity';
import { CultureEntity } from '../culture/culture.entity';
export declare class RecipeEntity {
    id: string;
    name: string;
    description: string;
    photoDish: string;
    time: number;
    partions: number;
    videoURL: string;
    cultures: CultureEntity;
    products: ProductEntity[];
}
