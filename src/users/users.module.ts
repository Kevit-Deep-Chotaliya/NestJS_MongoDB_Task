import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema.js';
import { UserService } from './service/user/user.service.js';
import { UsersController } from './controller/users/users.controller.js';

@Module({
    imports : [
        MongooseModule.forFeature([{
            name : User.name,
            schema : UserSchema
        }])
    ],
    providers: [UserService],
    controllers: [UsersController]
})
export class UsersModule {}
