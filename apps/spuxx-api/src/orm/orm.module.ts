import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnvModule } from '@src/env/env.module';

/**
 * The ORM/database module based on `sequelize`.
 */
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: EnvModule.get('DATABASE_HOST'),
      port: EnvModule.get('DATABASE_PORT'),
      username: EnvModule.get('DATABASE_USERNAME'),
      password: EnvModule.get('DATABASE_PASSWORD'),
      database: EnvModule.get('DATABASE_DB'),
      synchronize: EnvModule.get('DATABASE_SYNCHRONIZE'),
      sync: {
        alter: true,
      },
      autoLoadModels: true,
    }),
  ],
})
export class OrmModule {
  onModuleInit() {
    Logger.log(
      `Connection with database host '${EnvModule.get('DATABASE_HOST')}:${EnvModule.get('DATABASE_PORT')}' has been established.`,
      OrmModule.name,
    );
  }
}
