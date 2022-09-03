import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
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
import { UpdateUserDto } from './dto/updateUser.dto';
import { BookmarksDto } from './dto/bookmarks.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async read(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    let authid: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return this.userService.read(authid);
  }

  @Post()
  async create(
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
    let resp = await this.userService.read(authid);
    if (resp.data == null) {
      let userProfile = createUserDto;
      userProfile.authid = authid;
      userProfile.phone = phone;
      return this.userService.create(userProfile);
    } else {
      throw new HttpException(
        {
          success: false,
          error: 'User Exists',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Patch()
  async update(
    authid: string,
    @Body()
    updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return this.userService.update(authid, updateUserDto);
  }

  @Get('bookmark')
  async getBookmarks(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    let authid: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return this.userService.getBookmarks(authid);
  }

  @Patch('bookmark')
  async addBookmark(
    @Body()
    bookamrksDto: BookmarksDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    let authid: string;
    try {
      const session = await Session.getSession(req, res);
      authid = session.getUserId();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Session not available',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return this.userService.addBookmark(authid, bookamrksDto);
  }
}
