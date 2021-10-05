import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingresso } from "./ingresso.entity";
import { Salas } from "./salas.entity";

@Entity()
export class Filme extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Informe um horário correto',
  })
  @Column({
    type: 'time',
    nullable: false
  })
  horario: string

  @IsNotEmpty({
    message: 'O campo título é obrigatório',
  })
  @Column({
    nullable: false,
    length: 100
  })
  titulo: string

  @IsNotEmpty({
    message: 'O campo sinopse é obrigatório',
  })
  @Column({
    nullable: false
  })
  sinopse: string

  @IsNotEmpty({
    message: 'O campo gênero é obrigatório',
  })
  @Column({
    nullable: false,
    length: 20
  })
  genero: string

  @IsBoolean()
  @IsNotEmpty({
    message: 'O campo isAtivo é obrigatório',
  })
  @Column({
    nullable: false,
    default: false
  })
  isAtivo: boolean

  @IsInt()
  @IsNotEmpty({
    message: 'O campo classificacaoIdade é obrigatório',
  })
  @Column({
    nullable: false,
    type: 'int'
  })
  classificacaoIdade: number

  @ManyToOne(() => Salas, sala => sala.filme, { onDelete: 'CASCADE' })
  sala: Salas

  @ManyToOne(() => Ingresso, ingresso => ingresso.filme, { onDelete: 'CASCADE' })
  ingresso: Ingresso[]
}