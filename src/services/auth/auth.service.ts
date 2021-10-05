import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repositories/UserRepository.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CredentialDto } from 'src/dtos/CredentialDto';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {

  }

  async signin (credential: CredentialDto) {
    const {
      email,
      senha
    } = credential;

    const user = await this.userRepository.findOne({
      email: email
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.hash(senha, user.salt);

    if(user && (senhaValida === user.senha)) {
      const jwtPayload = {
        id: user.id,
        nome: user.nome
      };

      const token = await this.jwtService.sign(jwtPayload);

      return {
        token
      }
    }
    else {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
