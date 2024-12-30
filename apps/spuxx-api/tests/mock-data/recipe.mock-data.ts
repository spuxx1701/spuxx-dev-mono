import { RecipeCreateResource } from '@src/toledo/recipes/dtos/recipe.create.resource';

export const recipeMockData = {
  withText: new RecipeCreateResource({
    name: 'Hamburgers',
    icon: 'hamburger',
    text: '1. Buy buns\n2. Buy meat\n3. Cook meat\n4. Put meat on buns',
  }),
  withUrl: new RecipeCreateResource({
    name: 'Spaghetti Bolognese',
    icon: 'carrot',
    url: 'https://emmikochteinfach.de/bolognese-rezept/',
  }),
  full: new RecipeCreateResource({
    name: 'Spaghetti Bolognese',
    icon: 'carrot',
    url: 'https://emmikochteinfach.de/bolognese-rezept/',
    text: '1. Put water on to boil. \n2. Put spaghetti in water. \n3. Cook spaghetti.',
  }),
};
