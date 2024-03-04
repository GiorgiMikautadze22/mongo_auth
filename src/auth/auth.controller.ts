import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post("sign-up")
  signUp(@Body() singUpDto: SignUpDto) {
    return this.authService.signUp(singUpDto);
  }

  @Post("sign-in")
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }
}
