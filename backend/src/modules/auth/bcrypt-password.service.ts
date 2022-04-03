import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordService {
  public async hash(content: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(content, salt);
  }

  public verify(password, hash): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
