import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

interface Resp {
  message: string;
  data?: unknown;
}

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  // Response Handler
  Success(resp: Resp) {
    return {
      Success: true,
      message: resp.message,
      data: resp.data,
    };
  }

  // Method to CREATE a new profile
  async get(createUserDto: CreateUserDto) {
    try {
      const resp = await this.prismaService.user.create({
        data: createUserDto,
      });
      return this.Success({
        data: resp,
        message: 'User was created succesfully',
      });
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw err;
      } else {
        throw new HttpException(
          {
            success: false,
            error: "Could'nt create user",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  // Method to READ an existing profile with AuthID
  async read(authid: string) {
    try {
      const resp = await this.prismaService.user.findFirst({
        where: {
          authid,
        },
      });
      return this.Success({
        data: resp,
        message: 'User info was read succesfully',
      });
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw err;
      } else {
        throw new HttpException(
          {
            success: false,
            error: "Could'nt read user info",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  // Method to UPDATE an existing profile
  async update(authid: string, updateUserDto: UpdateUserDto) {
    try {
      const resp = await this.prismaService.user.update({
        where: { authid },
        data: updateUserDto,
      });
      return this.Success({
        data: resp,
        message: 'User info was updated succesfully',
      });
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw err;
      } else {
        throw new HttpException(
          {
            success: false,
            error: "Could'nt update user info",
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
