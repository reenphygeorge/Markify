import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

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
  async get(createUserDto: CreateUserDto, res: any) {
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
}
