import { EntityRepository, Repository } from "typeorm";
import { Salas } from "../entities/salas.entity";

@EntityRepository(Salas)
export class SalasRepository extends Repository<Salas> {

}