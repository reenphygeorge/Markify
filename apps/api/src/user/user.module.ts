import { Module } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
const prisma = new PrismaClient();

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
