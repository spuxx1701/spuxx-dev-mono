import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnvModule } from '@src/env/env.module';

/**
 * Initializes an in-memory sqlite database used for testing.
 */
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      database: ':memory:',
      synchronize: EnvModule.get('DATABASE_SYNCHRONIZE'),
      password: 'test',
      sync: {
        alter: true,
        force: true,
      },
      autoLoadModels: true,
    }),
  ],
})
export class TestOrmModule {}
