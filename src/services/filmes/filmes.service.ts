import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Filmes } from 'src/domain/entities/filme.entity';
import { FilmeRepository } from 'src/domain/repositories/FilmeRepository.repository';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';
import { FilmeDTO } from 'src/dtos/filme.dto';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(FilmeRepository)
    private filmeRepository: FilmeRepository,
    @InjectRepository(SalasRepository)
    private salaRepository: SalasRepository
  ) {}

  async findFilmeById (idFilme: number) {
    const filme = await this.filmeRepository.findOne(idFilme, {
      relations: ['sala']
    });

    if(!filme) {
      throw new NotFoundException('Filme não encontrado');
    }
    
    return filme;
  }

  async create (createFilmeDTO: FilmeDTO) {

    const sala = await this.salaRepository.findOne(createFilmeDTO.salaId);
    if (!sala) {
      throw new NotFoundException('Sala não encontrada');
    }

    const {
      horario,
      titulo,
      sinopse,
      genero,
      isAtivo,
      classificacaoIdade
    } = createFilmeDTO;

    try {
      const filme = this.filmeRepository.create({
        horario,
        titulo,
        sinopse,
        genero,
        isAtivo,
        classificacaoIdade
      });

      filme.sala = sala;

      await filme.save();

      return filme;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar um filme',
      );
    }
  }

  async update (filmeDto: FilmeDTO, idFilme: number) {

    const sala = await this.salaRepository.findOne(filmeDto.salaId);
    if (!sala) {
      throw new NotFoundException('Sala não encontrada');
    }

    const {
      isAtivo,
      titulo,
      sinopse,
      classificacaoIdade,
      genero,
      horario
    } = filmeDto;

    const filme = await this.findFilmeById(idFilme);

    try {

      filme.isAtivo = isAtivo;
      filme.horario = horario;
      filme.sinopse = sinopse;
      filme.titulo = titulo;
      filme.classificacaoIdade = classificacaoIdade;
      filme.genero = genero;
      
      filme.sala = sala;

      await filme.save();

      return filme;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao atualizar um filme',
      );
    }
  }

  async delete (idFilme: number) {
    const filme = await this.findFilmeById(idFilme);

    try {
      await filme.remove();

      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao remover um filme',
      );
    }
  }
}
