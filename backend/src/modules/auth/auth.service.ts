import { Injectable } from '@nestjs/common';
import {AuthDetailsDto} from "@auth/dto/auth.details.dto";

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, pass: string): Promise<AuthDetailsDto> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
