import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  validate(email: string, password: string): User | null {
    const user = this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid: boolean = user.password === password;
    return isPasswordValid ? user : null;
  }
}
