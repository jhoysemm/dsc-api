import { IsInt, IsNotEmpty } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Filme } from "./filme.entity";
import { Ingresso } from "./ingresso.entity";

@Entity()
export class Salas extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'O campo nome é obrigatório',
  })
  @Column({
    length: 20,
    nullable: false
  })
  nome: string;

  @IsInt()
  @IsNotEmpty({
    message: 'O campo limite cadeiras é obrigatório',
  })
  @Column({
    type: 'int',
    nullable: false
  })
  limiteCadeiras: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Filme, filme => filme.sala, { onDelete: 'CASCADE' })
  filme: Promise<Filme[]>

  @OneToMany(() => Ingresso, ingressos => ingressos.sala, { onDelete: 'CASCADE' })
  ingresso: Ingresso[]
}
