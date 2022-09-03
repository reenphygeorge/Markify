import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { Request, Response } from 'express';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async read(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    let authid: string;
    let phone: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
      phone = (await Passwordless.getUserById({ userId: authid })).phoneNumber;
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    let userProfile = createUserDto;
    userProfile.authid = authid;
    userProfile.phone = phone;
    return this.userService.get(userProfile, res);
  }
}
