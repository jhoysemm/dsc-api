import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingresso } from 'src/domain/entities/ingresso.entity';
import { FilmeRepository } from 'src/domain/repositories/FilmeRepository.repository';
import { IngressoRepository } from 'src/domain/repositories/IngressoRepository.repositoty';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';
import { UserRepository } from 'src/domain/repositories/UserRepository.repository';
import { IngressoDTO } from 'src/dtos/ingresso.dto';
import { IsNull, Not } from 'typeorm';

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


      return ingresso;
    } catch (error) {

      throw new InternalServerErrorException(
        'Erro ao obter informações sobre um ingresso',
      );
    }
  }

  async comprar (ingresso: IngressoDTO) {

    const {
      userEntity,
      salaEntity,
      filmeEntity
    } = await this.getDataIngresso(ingresso);

    const {
      preco
    } = ingresso;

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

  async finalizar (ingresso: IngressoDTO, ingressoId: number) {
    const ingressoEntity = await this.getInfoIngresso(ingressoId);

    const {
      salaEntity
    } = await this.getDataIngresso(ingresso);

    if (ingresso.user.email !== ingressoEntity.user.email) {
      throw new NotFoundException({
        message: 'Ingresso não encontrado'
      });
    }

    const totalIngressosBySalaId = await this.ingressoRepository.count({
      where: {
        sala: ingresso.sala,
        finishedAt: Not(IsNull())
      }
    });
        
    if (totalIngressosBySalaId < salaEntity.limiteCadeiras) {
      this.ingressoRepository.update({
        id: ingressoId
      }, {
        finishedAt: new Date()
      });

      return {
        message: 'Compra do ingresso finalizada com sucesso'
      }
    }

    throw new ConflictException({
      message: 'O limite de espaço foi atingindo'
    });
  }

  async getDataIngresso (ingresso: IngressoDTO) {
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

    return {
      userEntity,
      filmeEntity,
      salaEntity
    }
  }
}
