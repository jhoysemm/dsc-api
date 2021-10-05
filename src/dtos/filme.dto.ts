import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";

export class FilmeDTO {
  @IsNotEmpty({
    message: 'Informe um horário correto',
  })
  horario: string

  @IsNotEmpty({
    message: 'O campo título é obrigatório',
  })
  titulo: string

  @IsNotEmpty({
    message: 'O campo sinopse é obrigatório',
  })
  sinopse: string

  @IsNotEmpty({
    message: 'O campo gênero é obrigatório',
  })
  genero: string

  @IsBoolean()
  @IsNotEmpty({
    message: 'O campo isAtivo é obrigatório',
  })
  isAtivo: boolean

  @IsInt()
  @IsNotEmpty({
    message: 'O campo classificacaoIdade é obrigatório',
  })
  classificacaoIdade: number

  @IsInt()
  @IsNotEmpty({
    message: 'O campo sala é obrigatório',
  })
  salaId: number
}