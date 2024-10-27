import { Model } from 'sequelize-typescript';

declare global {
  type IncompleteModel<T extends Model> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T as T[K] extends Function
      ? never
      : K extends
            | 'id'
            | 'createdAt'
            | 'updatedAt'
            | 'deletedAt'
            | 'version'
            | '_attributes'
            | 'dataValues'
            | '_creationAttributes'
            | 'isNewRecord'
            | 'sequelize'
            | '_model'
        ? never
        : K]: T[K];
  };
}
