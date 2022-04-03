import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BcryptPasswordService {
  public async hash(content: string): Promise<string> {
    const salt = await genSalt(10);

    return hash(content, salt);
  }

  public verify(password, hash): Promise<boolean> {
    return compare(password, hash);
  }
}
