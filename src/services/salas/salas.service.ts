import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Salas } from 'src/domain/entities/salas.entity';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(SalasRepository)
    private salasRepository: SalasRepository
  ) {}

  async findAll() {
    try {
      const salas = await this.salasRepository.find();

      return salas;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar os filmes',
      );
    }
  }

  async findFilmesBySala (idSala: number) {
    const sala = await this.findSalaById(idSala);

    try {
      return sala.filme;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar os filmes de uma sala',
      );
    }
  }

  async findSalaById (idSala: number) {
    const sala = await this.salasRepository.findOne({
      id: idSala
    });

    if (!sala) {
      throw new NotFoundException(
        {
          message: "Sala não encontrada"
        }
      );
    }

    return sala;
  }
  async create (salaModel: Salas) {
    const { nome, limiteCadeiras } = salaModel;

    // Abrir uma transação (nível banco de dados)
    const sala = this.salasRepository.create();

    sala.nome = nome;
    sala.limiteCadeiras = limiteCadeiras;

    try {
      await sala.save();

      // Commit
      return sala;
    } catch (error) {
      // Rollback
    }
  }

  async update (salaModel: Salas, idSala: number) {
    const { nome, limiteCadeiras } = salaModel;

    const sala = await this.findSalaById(idSala);
    try {

      sala.nome = nome;
      sala.limiteCadeiras = limiteCadeiras;

      await sala.save();

      return sala;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar uma sala',
      );
    }
  }

  async delete (idSala: number) : Promise<boolean> {
    const sala = await this.findSalaById(idSala);

    try {
      await sala.remove();

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao remover uma sala',
      );
    }
  }
}
