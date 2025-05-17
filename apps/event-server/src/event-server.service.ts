import { Injectable } from '@nestjs/common';

@Injectable()
export class EventServerService {
  async getEvents(): Promise<string[]> {
    return [];
  }
}
