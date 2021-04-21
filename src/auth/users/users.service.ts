import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { IAuthUser, IUser } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private users: IUser[] = []; // Array de usuarios provisionalmente

  constructor(
    @InjectModel('users') private readonly usersModel: Model<IAuthUser>,
  ) {}

  async usersTrash(): Promise<void> {
    this.users = []; //Array de usuarios provisionales
  }
  private async pushUsersFromDB(): Promise<void> {
    //trae los objetos de mongo
    const authUsers = await this.usersModel.find();
    for (const user of authUsers) {
      const { username, password } = user;
      const userObj: IUser = { username, password };
      this.users.push(userObj);
    }
  }

  async findOne(username: string, password: string): Promise<IUser> {
    let userObj: IUser;

    this.pushUsersFromDB();

    for (const hash of this.users) {
      const userExists = await bcrypt
        .compare(username, hash.username)
        .then((res: boolean | undefined) => res);
      const passwordExists = await bcrypt
        .compare(password, hash.password)
        .then((res: boolean | undefined) => res);

      if (userExists && passwordExists) {
        userObj = { username: hash.username, password: hash.password };
        console.log(this.users);
        return userObj;
      }
    }
  }
}
