import { Injectable } from '@nestjs/common';
import { UserRepository } from '@db/repositories/user.repository';
import { UserEntity } from '@db/entities/user.entity';
import { BcryptPasswordService } from '@auth/bcrypt-password.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly jwt: JwtService,
    private readonly bcryptPasswordService: BcryptPasswordService,
  ) {}

  public async validate(
    email: string,
    password: string,
  ): Promise<UserEntity> | never {
    const user = await this.users.findByEmail(email);

    if (
      !user ||
      !(await this.bcryptPasswordService.verify(password, user.password))
    ) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  public async register(payload: RegisterDto): Promise<UserEntity> {
    const password = await this.bcryptPasswordService.hash(payload.password);

    return this.users.save(
      this.users.create({
        ...payload,
        password,
      }),
    );
  }

  public sign(user: UserEntity): Promise<string> {
    return this.jwt.signAsync({
      id: user.id,
      email: user.email,
      type: user.type,
      fullName: user.fullName,
    });
  }
}
