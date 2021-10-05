import { EntityRepository, Repository } from "typeorm";
import { Filme } from "../entities/filme.entity";

@EntityRepository(Filme)
export class FilmeRepository extends Repository<Filme> {

}