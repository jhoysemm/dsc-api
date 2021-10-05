import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CredentialDto } from 'src/dtos/CredentialDto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('signin')
  async signin (
    @Body(ValidationPipe) credentiaslsDto: CredentialDto,
  ) : Promise<{ token: string }>  {
    return await this.authService.signin(credentiaslsDto);
  }
}
