import { EntityRepository, Repository } from "typeorm";
import { Ingresso } from "../entities/ingresso.entity";

@EntityRepository(Ingresso)
export class IngressoRepository extends Repository<Ingresso> {

}