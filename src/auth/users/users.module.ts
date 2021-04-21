import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthUserSchema } from './schemas/users.schema';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature(
      [{ name: 'users', schema: AuthUserSchema }],
      'auth',
    ),
    PassportModule,
  ],
})
export class UsersModule {}
