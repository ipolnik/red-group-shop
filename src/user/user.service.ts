import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  byId(id: number) {
    throw new Error('Method not implemented.');
  }
}
