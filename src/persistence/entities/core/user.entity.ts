import { Entity, Column } from "typeorm";
import { DefaultEntity } from "../base.entity";

@Entity({ name: "user" })
export class User extends DefaultEntity<User> {
  @Column({ nullable: false, type: "varchar" })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: string;
}
