import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, HttpException, Patch, Delete, UseInterceptors } from '@nestjs/common';
import { UserService } from '../../service/user/user.service.js';
import { CreateUserDto } from '../../dto/CreateUser.dto.js';
import mongoose from 'mongoose';
import { UpdateUserDto } from '../../dto/UpdateUser.dto.js';
import { LoggerMiddleware } from '../../../logger/logger.middleware.js';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('users')
@UseInterceptors(LoggerMiddleware, CacheInterceptor)
export class UsersController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {

        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

    //users - (Get All Users)
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    //users/:id - (Get User By ID)
    @Get(':id')
    async getUserById(@Param('id') id: string) {

        const IsValid = mongoose.Types.ObjectId.isValid(id);
        if (!IsValid) {
            throw new HttpException('User Not Found', 404);
        }
        const findUser = await this.userService.getUserById(id);
        if (!findUser) {
            throw new HttpException('User Not Found', 404);
        }
        return findUser;
    }

    //users/:id - (Update user by ID)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const IsValid = mongoose.Types.ObjectId.isValid(id);
        if (!IsValid) {
            throw new HttpException('Invalid Id', 404);
        }
        const updatedUser = await this.userService.updateUser(id, updateUserDto);
        if (!updatedUser) {
            throw new HttpException('User Not Found', 404);
        }
        return updatedUser;
    }

    //users/:id - (Delete user by ID)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const IsValid = mongoose.Types.ObjectId.isValid(id);
        if (!IsValid) {
            throw new HttpException('Invalid Id', 404);
        }
        const deletedUser = await this.userService.deleteUser(id);
        if (!deletedUser) {
            throw new HttpException('User Not Found', 404);
        }
        return;
    }
}
