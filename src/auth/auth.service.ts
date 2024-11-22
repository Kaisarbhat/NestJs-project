import { UserDto, userSignInDto } from 'src/dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthServices {
  constructor(private prisma: PrismaService) {}
  async signup(userDto: UserDto): Promise<any> {
    //generate hash
    const hash = await argon.hash(
      userDto.password,
    );

    try {
      //save user
      const user = await this.prisma.user.create({
        data: {
          email: userDto.email,
          hash,
          firstname: userDto.firstname,
          lastname: userDto.lastname,
        },
      });

      //return user
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'Credentials Already Taken',
        );
      }
      throw error;
    }
  }

  async signin(userSignInDto: userSignInDto) {
    try {
      //check if user exits
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: userSignInDto.email,
          },
        });
      if (!user)
        throw new ForbiddenException(
          'Incorrect Credentials',
        );

      //check if password matches
      const pwdMatches = await argon.verify(
        user.hash,
        userSignInDto.password,
      );
      if (!pwdMatches)
        throw new ForbiddenException(
          'Incorrect Credentials',
        );
      //return user
      return user;
    } catch (error) {
      throw error;
    }
  }
}
