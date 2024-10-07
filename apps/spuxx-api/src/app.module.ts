import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@spuxx/nest-utils';
import { EnvModule } from './env/env.module';
import { authConfig } from './auth/auth.config';

@Module({
  imports: [EnvModule, AuthModule.forRoot(authConfig)],
  controllers: [AppController],
})
export class AppModule {}
