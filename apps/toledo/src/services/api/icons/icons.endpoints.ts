import { defineEndpoint } from '@spuxx/js-utils';

export const iconsEndpoints = {
  findManyIcons: defineEndpoint({
    function: async (query: string): Promise<Response> => {
      const response = await fetch(`https://api.iconify.design/search?query=mdi:${query}`);
      return response;
    },
    transformer: async (response: Response): Promise<string[]> => {
      const body: { icons: Record<number, string> } = await response.json();
      return Object.values(body.icons).map((icon: string) => icon.split(':')[1]);
    },
  }),
};
