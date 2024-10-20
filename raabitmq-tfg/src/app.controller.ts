import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { promises as fs } from 'fs';

@Controller()
export class AppController {
  constructor() {}

  @EventPattern('user_registered')
  async getMessage(@Payload() data: any) {

    if (!data) return;

    try {

      let existingData: any[] = [];

      try {
        const fileContent = await fs.readFile('user-data.json', 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error('Error reading file', error);
          return;
        }
      }

      existingData.push(data);

      await fs.writeFile('user-data.json', JSON.stringify(existingData, null, 2));
      console.log('Data addeed in file');
    } catch (error) {
      console.error('Something weny wrong while adding data in file', error);
    }
  }
}
