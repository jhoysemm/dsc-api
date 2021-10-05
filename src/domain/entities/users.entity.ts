import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Ingresso } from "./ingresso.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Informe um endereço de email',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false })
  salt: string;

  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  // @Column({ nullable: false, type: 'enum', enum: ['GERENTE', 'CLIENTE'], default: 'CLIENTE' })
  // role: string;

  @Column({ nullable: false, type: 'varchar', default: 'CLIENTE' })
  role: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Ingresso, ingresso => ingresso.user)
  ingresso: Ingresso[]
}