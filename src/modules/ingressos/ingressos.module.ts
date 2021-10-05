import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngressosController } from 'src/controllers/ingressos/ingressos.controller';
import { FilmeRepository } from 'src/domain/repositories/FilmeRepository.repository';
import { IngressoRepository } from 'src/domain/repositories/IngressoRepository.repositoty';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';
import { UserRepository } from 'src/domain/repositories/UserRepository.repository';
import { IngressosService } from 'src/services/ingressos/ingressos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngressoRepository, SalasRepository, FilmeRepository, UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [IngressosController],
  providers: [IngressosService],
  exports: [PassportModule]
})
export class IngressosModule {}
