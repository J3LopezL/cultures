import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Grupo 23!\nAPIs 2022';
  }
}
