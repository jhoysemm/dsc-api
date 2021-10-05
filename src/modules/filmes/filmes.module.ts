import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmesController } from 'src/controllers/filmes/filmes.controller';
import { FilmeRepository } from 'src/domain/repositories/FilmeRepository.repository';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';
import { FilmesService } from '../../services/filmes/filmes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmeRepository, SalasRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [FilmesService],
  controllers: [FilmesController],
  exports: [PassportModule]
})
export class FilmesModule {}
