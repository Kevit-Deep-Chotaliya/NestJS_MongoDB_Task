import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas/User.schema.js';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../dto/CreateUser.dto.js';
import { create } from 'domain';
import { UpdateUserDto } from '../../dto/UpdateUser.dto.js';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.UserModel(createUserDto);
        return newUser.save();
    }

    getUsers() {
        return this.UserModel.find();
    }

    getUserById(id: string) {
        return this.UserModel.findById(id);
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.UserModel.findByIdAndUpdate(id, updateUserDto, {returnDocument : 'after'});
    }

    deleteUser(id : string) {
        return this.UserModel.findByIdAndDelete(id, {returnDocument : 'after'})
    }
}
