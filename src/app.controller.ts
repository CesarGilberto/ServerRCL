import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  redirect(@Res() res: Response) {
    res.redirect(302, 'https://www.orion-homes.com');
  }
}
