import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credential } from "./Credentials";
import { IspCubeUser } from "./IspCubeUser";
import { Role, Status } from "../utils/types";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  surname: string;

  @Column()
  phone: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.SUSPENDED,
  })
  status: Status;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToOne(() => Credential)
  @JoinColumn()
  credential: Credential;

  @OneToOne(() => IspCubeUser, { nullable: true, cascade: true }) // Relación con ISP Cube User
  @JoinColumn()
  ispCubeUser: IspCubeUser | null;
}