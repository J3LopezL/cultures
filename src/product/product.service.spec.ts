import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { faker } from '@faker-js/faker';
import { CultureEntity } from '../culture/culture.entity';
import { RecipeEntity } from '../recipe/recipe.entity';
import { RecipeService } from '../recipe/recipe.service';

describe('ProductService', () => {
  let service: ProductService;
  let serviceRecipe: RecipeService;
  let repository: Repository<ProductEntity>;
  let repositoryRecipe: Repository<RecipeEntity>;
  let productList: ProductEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductService, RecipeService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    serviceRecipe = module.get<RecipeService>(RecipeService);
    repository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
    repositoryRecipe = module.get<Repository<RecipeEntity>>(
      getRepositoryToken(RecipeEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    productList = [];

    for (let i = 0; i < 5; i++) {
      const prodcut: ProductEntity = await repository.save({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        history: faker.lorem.sentence(),
        category: faker.lorem.sentence(),
      });
      productList.push(prodcut);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all products', async () => {
    const prodcuts: ProductEntity[] = await service.findAll();
    expect(prodcuts).not.toBeNull();
    expect(prodcuts).toHaveLength(productList.length);
  });

  it('findOne should return a product by id', async () => {
    const storedproduct: ProductEntity = productList[0];
    const product: ProductEntity = await service.findOne(storedproduct.id);
    expect(product).not.toBeNull();
    expect(product.name).toEqual(storedproduct.name);
  });

  it('findOne should throw an exception for an invalid product', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The product with the given id was not found',
    );
  });

  it('create should a new recipe and return a new product', async () => {
    const recipe: RecipeEntity = {
      id: '',
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      photoDish: faker.image.imageUrl(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
      products: [],
      cultures: new CultureEntity(),
    };

    const newReceta: RecipeEntity = await serviceRecipe.create(recipe);
    const storedReceta: RecipeEntity = await repositoryRecipe.findOne({
      where: { id: `${newReceta.id}` },
    });

    const product: ProductEntity = {
      id: '',
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      history: faker.lorem.sentence(),
      category: faker.lorem.sentence(),
      recipes: recipe,
    };

    const newproduct: ProductEntity = await service.create(product);
    expect(newproduct).not.toBeNull();
    expect(storedReceta).not.toBeNull();
    expect(storedReceta.name).toEqual(newReceta.name);
  });

  it('update should modify a product', async () => {
    const product: ProductEntity = productList[0];
    product.name = 'New name';

    const updatedProduct: ProductEntity = await service.update(
      product.id,
      product,
    );
    expect(updatedProduct).not.toBeNull();

    const storedProduct: ProductEntity = await repository.findOne({
      where: { id: `${product.id}` },
    });
    expect(storedProduct).not.toBeNull();
    expect(storedProduct.name).toEqual(product.name);
  });

  it('delete should remove a product', async () => {
    const product: ProductEntity = productList[0];
    await service.delete(product.id);

    const deletedProduct: ProductEntity = await repository.findOne({
      where: { id: `${product.id}` },
    });
    expect(deletedProduct).toBeNull();
  });

  it('delete should throw an exception for an invalid product', async () => {
    const product: ProductEntity = productList[0];
    await service.delete(product.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The product with the given id was not found',
    );
  });
});
