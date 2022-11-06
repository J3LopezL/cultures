import { ProductEntity } from '../product/product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    findAll(): Promise<ProductEntity[]>;
    findOne(id: string): Promise<ProductEntity>;
    create(product: ProductEntity): Promise<ProductEntity>;
    update(id: string, product: ProductEntity): Promise<ProductEntity>;
    delete(id: string): Promise<void>;
}
