import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-guard';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserByEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserByUsername(username: string) {
    return this.userService.getUserByUsername(username);
  }
}
