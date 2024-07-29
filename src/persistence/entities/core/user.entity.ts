import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { DefaultEntity } from "../base.entity";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar" })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  teste: string;

  @Column()
  teste2: string;

  @Column()
  ninehundred: string;
}
