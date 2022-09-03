import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI:
        'https://5d227df12b6b11ed90e79b78e64c7774-us-east-1.aws.supertokens.io:3568',
      apiKey: 'bfT9mPH9GMy-zRzzH9P6ATGtf-eKUm',
      appInfo: {
        appName: 'Markify',
        apiDomain: 'http://localhost:8000',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
