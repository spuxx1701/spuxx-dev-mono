import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRegistrationMiddleware } from './middlewares/user-registration.middleware';
import { User } from './models/user.model';
import { UsersProvider } from './services/users.provider';
import { UsersRegistrar } from './services/users.registrar';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersRegistrar, UsersProvider],
  exports: [UsersProvider],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserRegistrationMiddleware).forRoutes('*');
  }
}
