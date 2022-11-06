import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './recipe.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { CultureEntity } from '../culture/culture.entity';

describe('RecipeService', () => {
  let service: RecipeService;
  let repository: Repository<RecipeEntity>;
  let recipeList: RecipeEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RecipeService],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    repository = module.get<Repository<RecipeEntity>>(
      getRepositoryToken(RecipeEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    recipeList = [];
    for (let i = 0; i < 5; i++) {
      const recipe: RecipeEntity = await repository.save({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        photoDish: faker.image.imageUrl(),
        time: 1234,
        partions: 12341,
        videoURL: faker.image.imageUrl(),
      });
      recipeList.push(recipe);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all recipes', async () => {
    const recipe: RecipeEntity[] = await service.findAll();
    expect(recipe).not.toBeNull();
    expect(recipe).toHaveLength(recipeList.length);
  });

  it('findOne should return a recipe by id', async () => {
    const storedReceta: RecipeEntity = recipeList[0];
    const recipe: RecipeEntity = await service.findOne(storedReceta.id);
    expect(recipe).not.toBeNull();
    expect(recipe.name).toEqual(storedReceta.name);
    expect(recipe.description).toEqual(storedReceta.description);
  });

  it('findOne should throw an exception for an invalid recipe', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('create should return a new recipe', async () => {
    const recipe: RecipeEntity = {
      id: '',
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      photoDish: faker.image.imageUrl(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
      cultures: new CultureEntity(),
      products: [],
    };

    const newRecipe: RecipeEntity = await service.create(recipe);
    expect(newRecipe).not.toBeNull();

    const storedRecipe: RecipeEntity = await repository.findOne({
      where: { id: `${newRecipe.id}` },
    });
    expect(storedRecipe).not.toBeNull();
    expect(storedRecipe.name).toEqual(newRecipe.name);
    expect(storedRecipe.description).toEqual(newRecipe.description);
  });

  it('update should modify a recipe', async () => {
    const recipe: RecipeEntity = recipeList[0];
    recipe.name = 'New name';
    recipe.description = 'New descripción';

    const updatedrecipe: RecipeEntity = await service.update(recipe.id, recipe);
    expect(updatedrecipe).not.toBeNull();

    const storedRecipe: RecipeEntity = await repository.findOne({
      where: { id: `${recipe.id}` },
    });
    expect(storedRecipe).not.toBeNull();
    expect(storedRecipe.name).toEqual(recipe.name);
    expect(storedRecipe.description).toEqual(recipe.description);
  });

  it('update should throw an exception for an invalid recipe', async () => {
    let recipe: RecipeEntity = recipeList[0];
    recipe = {
      ...recipe,
      name: 'New name',
      description: 'New Description',
    };
    await expect(() => service.update('0', recipe)).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('delete should remove a recipe', async () => {
    const recipe: RecipeEntity = recipeList[0];
    await service.delete(recipe.id);

    const deletedrecipe: RecipeEntity = await repository.findOne({
      where: { id: `${recipe.id}` },
    });
    expect(deletedrecipe).toBeNull();
  });

  it('delete should throw an exception for an invalid recipe', async () => {
    const recipe: RecipeEntity = recipeList[0];
    await service.delete(recipe.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });
});
