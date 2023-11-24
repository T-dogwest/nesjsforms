import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Registrationdto } from './registration.dto';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Get('register')
  @Render('registerForm')
  registerForm() { errors:[] }

  @Post('register')
  @Render('registerForm')
  register(@Body() registration: Registrationdto) {
    const errors: string[] = [];

    if (registration.email.includes('@')) {
      errors.push('nem jo az email.cim')
    }
    if (registration.password.length < 8) {
      errors.push('a jelszo nem eleg hosszu')
    }
    if (registration.passwordagain !== registration.password) {
      errors.push("nem egyezik a jelszo")
    }
    const age = parseInt(registration.age);
    if (age < 18 || isNaN(age)) {
      errors.push("nem eleg idos")
    }
    if (errors.length > 0) {
      return { errors, }
    } else {
      return {};
    }

  }
}

