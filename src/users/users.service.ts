import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public createUser(createUserInput: CreateUserInput): User {
    const user: User = { id: uuidv4(), ...createUserInput };
    this.users.push(user);
    return user;
  }

  public updateUser(updateUserInput: UpdateUserInput): User {
    const user = this.users.find(user => user.id === updateUserInput.id);

    Object.assign(user, updateUserInput);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find(user => user.id === getUserArgs.id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.ids.map(id => this.getUser({ id }));
  }

  public deleteUser(deleteUserInput: DeleteUserInput): User {
    const index = this.users.findIndex(user => user.id === deleteUserInput.id);

    const user = this.users[index];

    this.users.splice(index);

    return user;
  }
}