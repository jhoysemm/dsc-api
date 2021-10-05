import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingresso } from 'src/domain/entities/ingresso.entity';
import { FilmeRepository } from 'src/domain/repositories/FilmeRepository.repository';
import { IngressoRepository } from 'src/domain/repositories/IngressoRepository.repositoty';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';
import { UserRepository } from 'src/domain/repositories/UserRepository.repository';
import { IngressoDTO } from 'src/dtos/ingresso.dto';

@Injectable()
export class IngressosService {
  constructor (
    @InjectRepository(IngressoRepository)
    private ingressoRepository: IngressoRepository,
    @InjectRepository(SalasRepository)
    private salaRepository: SalasRepository,
    @InjectRepository(FilmeRepository)
    private filmeRepository: FilmeRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {

  }

  async getInfoIngresso (idIngresso: number) {

    const ingresso = await this.ingressoRepository.findOne(idIngresso, {
      relations: ['user', 'filme', 'sala']
    });

    if (!ingresso) {
      throw new NotFoundException(
        {
          message: "Ingresso não encontrado"
        }
      );
    }
    
    try {

      const ingressoData = {
        preco: ingresso.preco,
        filme: ingresso.filme.titulo,
        user: ingresso.user.nome,
        sala: ingresso.sala.nome,
        horario: ingresso.filme.horario
      };

      return ingressoData;
    } catch (error) {

      throw new InternalServerErrorException(
        'Erro ao obter informações sobre um ingresso',
      );
    }
  }

  async comprar (ingresso: IngressoDTO) {

    const userEntity = await this.userRepository.findOne(ingresso.user);
    const filmeEntity = await this.filmeRepository.findOne(ingresso.filme);
    const salaEntity = await this.salaRepository.findOne(ingresso.sala);

    if(!userEntity) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if(!filmeEntity) {
      throw new NotFoundException('Filme não encontrado');
    }

    if(!salaEntity) {
      throw new NotFoundException('Sala não encontrada');
    }

    const {
      preco
    } = ingresso
    const ingressoRepository = this.ingressoRepository.create({
      user: userEntity,
      sala: salaEntity,
      filme: filmeEntity,
      preco
    });

    try {
      await ingressoRepository.save();

      return ingresso;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao comprar um ingresso',
      );
    }
  }
}
