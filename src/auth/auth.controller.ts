import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthServices } from './auth.service';
import { UserDto, userSignInDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authServices: AuthServices,
  ) {}
  @Post('register')
  signup(@Body() dto: UserDto) {
    // console.log({
    //   dto,
    // });
    return this.authServices.signup(dto);
  }

  @Post('login')
  signin(@Body() userSignInDto: userSignInDto) {
    console.log(userSignInDto);
    return this.authServices.signin(
      userSignInDto,
    );
  }
}
