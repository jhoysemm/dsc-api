import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';
import { SalasService } from '../../services/salas/salas.service';
import { SalasController } from '../../controllers/salas/salas.controller';
import { PassportModule } from '@nestjs/passport';

// Conceito de Injeção de Dependência
@Module({
  imports: [
    TypeOrmModule.forFeature([SalasRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [SalasService],
  controllers: [SalasController],
  exports: [PassportModule, SalasService]
})
export class SalasModule {}
