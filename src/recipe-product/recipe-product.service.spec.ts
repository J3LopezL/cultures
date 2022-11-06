import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from '../product/product.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RecipeProductService } from './recipe-product.service';
import { RecipeEntity } from '../recipe/recipe.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('RecipeProductService', () => {
  let service: RecipeProductService;
  let recipeRepository: Repository<RecipeEntity>;
  let productRepository: Repository<ProductEntity>;
  let recipe: RecipeEntity;
  let productsList: ProductEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeProductService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<RecipeProductService>(RecipeProductService);

    recipeRepository = module.get<Repository<RecipeEntity>>(
      getRepositoryToken(RecipeEntity),
    );
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    productRepository.clear();
    recipeRepository.clear();

    productsList = [];
    for (let i = 0; i < 5; i++) {
      const product: ProductEntity = await productRepository.save({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        history: faker.lorem.sentence(),
        category: faker.lorem.sentence(),
      });
      productsList.push(product);
    }

    recipe = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      photoDish: faker.image.imageUrl(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
      products: productsList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addproductrecipe should thrown exception for an invalid product', async () => {
    const newrecipe: RecipeEntity = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      photoDish: faker.image.imageUrl(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
    });

    await expect(() =>
      service.addProductRecipe(newrecipe.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The product with the given id was not found',
    );
  });

  it('addproductrecipe should throw an exception for an invalid recipe', async () => {
    const newproduct: ProductEntity = await productRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      history: faker.lorem.sentence(),
      category: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addProductRecipe('0', newproduct.id),
    ).rejects.toHaveProperty(
      'message',
      'The product with the given id was not found',
    );
  });

  it('findproductByrecipeIdproductId should return product by recipe', async () => {
    const product: ProductEntity = productsList[0];
    const storedproduct: ProductEntity =
      await service.findProductByRecipeIdProductId(recipe.id, product.id);
    expect(storedproduct).not.toBeNull();
    expect(storedproduct.name).toBe(product.name);
  });

  it('findproductByrecipeIdproductId should throw an exception for an invalid product', async () => {
    await expect(() =>
      service.findProductByRecipeIdProductId(recipe.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The product with the given id was not found',
    );
  });

  it('findproductByrecipeIdproductId should throw an exception for an invalid recipe', async () => {
    const product: ProductEntity = productsList[0];
    await expect(() =>
      service.findProductByRecipeIdProductId('0', product.id),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('findproductByrecipeIdproductId should throw an exception for an product not associated to the recipe', async () => {
    const newproduct: ProductEntity = await productRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      history: faker.lorem.sentence(),
      category: faker.lorem.sentence(),
    });

    await expect(() =>
      service.findProductByRecipeIdProductId(recipe.id, newproduct.id),
    ).rejects.toHaveProperty(
      'message',
      'The product with the given id is not associated to the recipe',
    );
  });

  it('findProductsByRecipeId should return products by recipe', async () => {
    const products: ProductEntity[] = await service.findProductsByRecipeId(
      recipe.id,
    );
    expect(products.length).toBe(5);
  });

  it('findproductsByrecipeId should throw an exception for an invalid recipe', async () => {
    await expect(() =>
      service.findProductsByRecipeId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('associateproductsrecipe should update products list for a recipe', async () => {
    const newproduct: ProductEntity = await productRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      history: faker.lorem.sentence(),
      category: faker.lorem.sentence(),
    });

    const updatedrecipe: RecipeEntity = await service.associateProductsrecipe(
      recipe.id,
      [newproduct],
    );
    expect(updatedrecipe.products.length).toBe(1);

    expect(updatedrecipe.products[0].name).toBe(newproduct.name);
  });

  it('associateproductsrecipe should throw an exception for an invalid recipe', async () => {
    const newproduct: ProductEntity = await productRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      history: faker.lorem.sentence(),
      category: faker.lorem.sentence(),
    });

    await expect(() =>
      service.associateProductsrecipe('0', [newproduct]),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('associateproductsrecipe should throw an exception for an invalid product', async () => {
    const newproduct: ProductEntity = productsList[0];
    newproduct.id = '0';

    await expect(() =>
      service.associateProductsrecipe(recipe.id, [newproduct]),
    ).rejects.toHaveProperty(
      'message',
      'The product with the given id was not found',
    );
  });

  it('deleteproductTorecipe should remove an product from a recipe', async () => {
    const product: ProductEntity = productsList[0];

    await service.deleteproductRecipe(recipe.id, product.id);

    const storedrecipe: RecipeEntity = await recipeRepository.findOne({
      where: { id: `${recipe.id}` },
      relations: ['products'],
    });
    const deletedproduct: ProductEntity = storedrecipe.products.find(
      (a) => a.id === product.id,
    );

    expect(deletedproduct).toBeUndefined();
  });

  it('deleteproductTorecipe should thrown an exception for an invalid product', async () => {
    await expect(() =>
      service.deleteproductRecipe(recipe.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The product with the given id was not found',
    );
  });

  it('deleteproductTorecipe should thrown an exception for an invalid recipe', async () => {
    const product: ProductEntity = productsList[0];
    await expect(() =>
      service.deleteproductRecipe('0', product.id),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('deleteproductTorecipe should thrown an exception for an non asocciated product', async () => {
    const newproduct: ProductEntity = await productRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      history: faker.lorem.sentence(),
      category: faker.lorem.sentence(),
    });

    await expect(() =>
      service.deleteproductRecipe(recipe.id, newproduct.id),
    ).rejects.toHaveProperty(
      'message',
      'The product with the given id is not associated to the recipe',
    );
  });
});
