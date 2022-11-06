import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CultureRecipeService } from './culture-recipe.service';
import { RecipeEntity } from '../recipe/recipe.entity';
import { Repository } from 'typeorm';
import { CultureEntity } from '../culture/culture.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { ProductEntity } from 'src/product/product.entity';

describe('CultureRecipeService', () => {
  let service: CultureRecipeService;
  let cultureRepository: Repository<CultureEntity>;
  let recipeRepository: Repository<RecipeEntity>;
  let culture: CultureEntity;
  let cultures: CultureEntity[];
  let products: ProductEntity[];
  let recipesList: RecipeEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CultureRecipeService],
    }).compile();

    service = module.get<CultureRecipeService>(CultureRecipeService);
    cultureRepository = module.get<Repository<CultureEntity>>(
      getRepositoryToken(CultureEntity),
    );
    recipeRepository = module.get<Repository<RecipeEntity>>(
      getRepositoryToken(RecipeEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    recipeRepository.clear();
    cultureRepository.clear();

    recipesList = [];
    for (let i = 0; i < 5; i++) {
      const recipe: RecipeEntity = await recipeRepository.save({
        name: faker.company.name(),
        description: faker.address.direction(),
        photoDish: faker.image.avatar(),
        time: 1234,
        partions: 12341,
        videoURL: faker.image.imageUrl(),
      });
      recipesList.push(recipe);
    }

    culture = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      recipes: recipesList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addrecipeCulture should add an recipe to a culture', async () => {
    const newrecipe: RecipeEntity = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.address.direction(),
      photoDish: faker.image.avatar(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
    });

    const newCulture: CultureEntity = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    });

    const result: CultureEntity = await service.addrecipeCulture(
      newCulture.id,
      newrecipe.id,
    );

    expect(result.recipes.length).toBe(1);
    expect(result.recipes[0]).not.toBeNull();
    expect(result.recipes[0].name).toBe(newrecipe.name);
  });

  it('addrecipeCulture should thrown exception for an invalid recipe', async () => {
    const newCulture: CultureEntity = await cultureRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addrecipeCulture(newCulture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('addrecipeCulture should throw an exception for an invalid culture', async () => {
    const newrecipe: RecipeEntity = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.address.direction(),
      photoDish: faker.image.avatar(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
    });

    await expect(() =>
      service.addrecipeCulture('0', newrecipe.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('findrecipeByCultureIdrecipeId should return recipe by culture', async () => {
    const recipe: RecipeEntity = recipesList[0];
    const storedrecipe: RecipeEntity =
      await service.findrecipeByCultureIdrecipeId(culture.id, recipe.id);
    expect(storedrecipe).not.toBeNull();
    expect(storedrecipe.name).toBe(recipe.name);
  });

  it('findrecipeByCultureIdrecipeId should throw an exception for an invalid recipe', async () => {
    await expect(() =>
      service.findrecipeByCultureIdrecipeId(culture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('findrecipeByCultureIdrecipeId should throw an exception for an invalid culture', async () => {
    const recipe: RecipeEntity = recipesList[0];
    await expect(() =>
      service.findrecipeByCultureIdrecipeId('0', recipe.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('findrecipeByCultureIdrecipeId should throw an exception for an recipe not associated to the culture', async () => {
    const newrecipe: RecipeEntity = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.address.direction(),
      photoDish: faker.image.avatar(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
    });

    await expect(() =>
      service.findrecipeByCultureIdrecipeId(culture.id, newrecipe.id),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id is not associated to the culture',
    );
  });

  it('findrecipesByCultureId should return recipes by culture', async () => {
    const recipes: RecipeEntity[] = await service.findrecipesByCultureId(
      culture.id,
    );
    expect(recipes.length).toBe(5);
  });

  it('findrecipesByCultureId should throw an exception for an invalid culture', async () => {
    await expect(() =>
      service.findrecipesByCultureId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('associaterecipesCulture should update recipes list for a culture', async () => {
    const newrecipe: RecipeEntity = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.address.direction(),
      photoDish: faker.image.avatar(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
    });

    const updatedculture: CultureEntity = await service.associaterecipesCulture(
      culture.id,
      [newrecipe],
    );
    expect(updatedculture.recipes.length).toBe(1);

    expect(updatedculture.recipes[0].name).toBe(newrecipe.name);
  });

  it('associaterecipesCulture should throw an exception for an invalid culture', async () => {
    const newrecipe: RecipeEntity = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.address.direction(),
      photoDish: faker.image.avatar(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
    });

    await expect(() =>
      service.associaterecipesCulture('0', [newrecipe]),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('associaterecipesCulture should throw an exception for an invalid recipe', async () => {
    const newrecipe: RecipeEntity = recipesList[0];
    newrecipe.id = '0';

    await expect(() =>
      service.associaterecipesCulture(culture.id, [newrecipe]),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('deleterecipeToCulture should remove an recipe from a culture', async () => {
    const recipe: RecipeEntity = recipesList[0];

    await service.deleterecipeCulture(culture.id, recipe.id);

    const storedculture: CultureEntity = await cultureRepository.findOne({
      where: { id: `${culture.id}` },
      relations: ['recipes'],
    });
    const deletedrecipe: RecipeEntity = storedculture.recipes.find(
      (a) => a.id === recipe.id,
    );

    expect(deletedrecipe).toBeUndefined();
  });

  it('deleterecipeToCulture should thrown an exception for an invalid recipe', async () => {
    await expect(() =>
      service.deleterecipeCulture(culture.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id was not found',
    );
  });

  it('deleterecipeToCulture should thrown an exception for an invalid culture', async () => {
    const recipe: RecipeEntity = recipesList[0];
    await expect(() =>
      service.deleterecipeCulture('0', recipe.id),
    ).rejects.toHaveProperty(
      'message',
      'The culture with the given id was not found',
    );
  });

  it('deleterecipeToCulture should thrown an exception for an non asocciated recipe', async () => {
    const newrecipe: RecipeEntity = await recipeRepository.save({
      name: faker.company.name(),
      description: faker.address.direction(),
      photoDish: faker.image.avatar(),
      time: 1234,
      partions: 12341,
      videoURL: faker.image.imageUrl(),
    });

    await expect(() =>
      service.deleterecipeCulture(culture.id, newrecipe.id),
    ).rejects.toHaveProperty(
      'message',
      'The recipe with the given id is not associated to the culture',
    );
  });
});
