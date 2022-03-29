import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signIn')
    signIn(@Body() userDto: CreateUserDto){
        return this.authService.signIn(userDto)
    }
    @Post('/signUp')
    signUp(@Body() userDto: CreateUserDto){
        return this.authService.signUp(userDto)
    }
}
