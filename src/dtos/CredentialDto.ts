import { IsNotEmpty } from "class-validator";

export class CredentialDto {
  @IsNotEmpty({
    message: 'O campo email é obrigatório',
  })
  email: string;

  @IsNotEmpty({
    message: 'O campo senha é obrigatório',
  })
  senha: string;
}