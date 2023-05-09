import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(email: string): Promise<boolean> {
    return email == 'test@mail.ru'
  }
}
