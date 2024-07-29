import { Column, Entity } from "typeorm";
import { DefaultEntity } from "../base.entity";

@Entity({ name: "tenant" })
export class Tenant extends DefaultEntity<Tenant> {
  @Column({ name: "full_name", nullable: false, type: "varchar" })
  full_name: string;
}
