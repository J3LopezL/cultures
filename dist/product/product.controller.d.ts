import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(ProductEntity: ProductEntity): Promise<ProductEntity>;
    findproductId(productId: string): Promise<ProductEntity>;
    findProducts(): Promise<ProductEntity[]>;
    updateProduct(ProductEntity: ProductEntity, productId: string): Promise<ProductEntity>;
    deleteProduct(productId: string): Promise<void>;
}
