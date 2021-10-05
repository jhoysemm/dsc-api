import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/domain/entities/users.entity';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService) {

  }

  @Post()
  async signup (
    @Body(ValidationPipe) userModel: User
  ) : Promise<User> {
    const user = await this.usersService.signUp(userModel);

    return user;
  }

  @Role('GERENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('create_user_gerente')
  async createUserGerente (
    @Body(ValidationPipe) userModel: User
  ) {
    const user = await this.usersService.createUserGerente(userModel);

    return user;
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getInfoUser (
    @Req() req
  ) {
    return req.user;
  }
}
