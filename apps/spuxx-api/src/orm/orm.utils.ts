import { FindOptions } from 'sequelize';

/**
 * Transforms a query object to Sequelize `FindOptions`.
 * @param query The query object.
 * @returns The Sequelize `FindOptions`.
 */
export function transformQueryToFindOptions(query: { include?: string[] }): FindOptions<unknown> {
  const findOptions: FindOptions<unknown> = {};
  if (query.include) {
    findOptions.include = [...query.include];
  }
  return findOptions;
}
