import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Role } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Filme } from 'src/domain/entities/filme.entity';
import { Salas } from 'src/domain/entities/salas.entity';
import { SalasService } from 'src/services/salas/salas.service';

@Controller('salas')
export class SalasController {
  constructor (private salasService: SalasService) {

  }

  @Get()
  async findAll () : Promise<Salas[]> {
    const salas = await this.salasService.findAll();

    return salas;
  }

  @Get(':idSala/filmes')
  async findFilmesBySala (
    @Param('idSala') idSala: number
  ) : Promise<Filme[]> {
    const filmes = await this.salasService.findFilmesBySala(idSala);

    return filmes;
  }

  @Role('GERENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  async create (
    @Body(ValidationPipe) salaModel: Salas
  ) : Promise<Salas> {
    const sala = await this.salasService.create(salaModel);

    return sala;
  }

  @Role('GERENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Put(':idSala')
  async update (
    @Param('idSala') idSala: number,
    @Body(ValidationPipe) salaModel: Salas
  ) {
    const sala = await this.salasService.update(salaModel, idSala);

    return sala;
  }

  @Role('GERENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Delete(':idSala')
  async delete (
    @Param('idSala') idSala: number,
    @Res() res: Response
  ) {
    const deleted = await this.salasService.delete(idSala);

    if (deleted) {
      res.status(HttpStatus.OK).send({
        message: 'Sala foi removida com sucesso'
      });
    }
    else {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Sala não foi removida com sucesso'
      });
    }
  }
}
