/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

/*   @Get('menu')
  getMenu() {
    const prisma = new PrismaClient();
    return prisma.menu.findMany();
  } */
}
