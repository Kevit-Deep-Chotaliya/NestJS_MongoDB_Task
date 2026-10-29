import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module.js';
import { UserSchema } from './schemas/User.schema.js';
import { UploadsModule } from './uploads/uploads.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs_mongodb'),
    UsersModule,
    UploadsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
