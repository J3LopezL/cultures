import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() ProductEntity: ProductEntity) {
    return await this.productService.create(ProductEntity);
  }

  @Get(':productId')
  async findproductId(@Param('productId') productId: string) {
    return await this.productService.findOne(productId);
  }

  @Get()
  async findProducts() {
    return await this.productService.findAll();
  }

  @Put(':productId')
  async updateProduct(
    @Body() ProductEntity: ProductEntity,
    @Param('productId') productId: string,
  ) {
    return await this.productService.update(productId, ProductEntity);
  }

  @Delete(':productId')
  @HttpCode(204)
  async deleteProduct(@Param('productId') productId: string) {
    return await this.productService.delete(productId);
  }
}
