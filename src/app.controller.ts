import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { HttpAuthGuard } from './auth/http.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(HttpAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
