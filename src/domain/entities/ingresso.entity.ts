import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Filme } from "./filme.entity";
import { Salas } from "./salas.entity";
import { User } from "./users.entity";

@Entity()
export class Ingresso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'O campo preço é obrigatório',
  })
  @Column({
    type: 'float',
    nullable: false
  })
  preco: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @IsNotEmpty({
    message: 'O campo sala é obrigatório',
  })
  @ManyToOne(() => Salas, salas => salas.ingresso, { onDelete: 'CASCADE' })
  sala: Salas

  @IsNotEmpty({
    message: 'O campo filme é obrigatório',
  })
  @ManyToOne(() => Filme, filmes => filmes.ingresso, { onDelete: 'CASCADE' })
  filme: Filme

  @IsNotEmpty({
    message: 'O campo user é obrigatório',
  })
  @ManyToOne(() => User, user => user.ingresso, { onDelete: 'CASCADE' })
  user: User
}