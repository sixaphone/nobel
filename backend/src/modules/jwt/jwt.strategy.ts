import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '@config/jwt.config';
import { ConfigKey } from '@config/config-key.enum';
import { JwtSignOptions } from '@auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@db/entities/user.entity';
import { UserRepository } from '@db/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectRepository(UserEntity)
    private readonly users: UserRepository,
  ) {
    const { secret } = config.get<JwtConfig>(ConfigKey.JWT);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
    this.users = this.users.extend(UserRepository);
  }

  public async validate(payload: JwtSignOptions) {
    const user: UserEntity | undefined = await this.users.findByEmail(
      payload.email,
    );

    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }
}
