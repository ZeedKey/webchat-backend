import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(userDto: CreateUserDto) {
    const userName = await this.userService.getUserByUsername(userDto.username);
    if (!userName) {
      throw new HttpException(
        "The user doesn't exist",
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
    const user = await this.validateUser(userDto.username, userDto.password);
    return this.generateToken(user);
  }

  async signUp(userDto: CreateUserDto) {
    const userEmail = await this.userService.getUserByEmail(userDto.email);
    const userName = await this.userService.getUserByUsername(userDto.username);
    if (userEmail || userName) {
      throw new HttpException(
        'The user already exists',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    const isPassCorrect = await bcrypt.compare(pass, user.password);
    if (user && isPassCorrect) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Access denied' });
  }

  async generateToken(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
