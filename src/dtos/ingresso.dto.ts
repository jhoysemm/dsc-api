import { IsNotEmpty, IsNumber } from "class-validator";

export class IngressoDTO {

  @IsNumber()
  @IsNotEmpty({
    message: 'O campo preço é obrigatório',
  })
  preco: number;

  @IsNotEmpty({
    message: 'O campo sala é obrigatório',
  })
  sala: number

  @IsNotEmpty({
    message: 'O campo filme é obrigatório',
  })
  filme: number

  user: number
}