import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module.js';
import { UserSchema } from './schemas/User.schema.js';
import { LoggerMiddleware } from './logger/logger.middleware.js';
import { UsersController } from './users/controller/users/users.controller.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs_mongodb'),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {path : 'users', method : RequestMethod.GET}
    );
  }
}
