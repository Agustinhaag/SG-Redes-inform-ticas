import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credential } from "./Credentials";
import { IspCubeUser } from "./IspCubeUser";
import { Role, Status } from "../utils/types";
import { Campaign } from "./Campaign";

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

  @Column({
    nullable: true,
  })
  tokenwablas: string;

  @Column({
    nullable: true,
  })
  deviceid: string;

  @Column({
    nullable: true,
  })
  device: string;

  @OneToOne(() => Credential)
  @JoinColumn()
  credential: Credential;

  @OneToOne(() => IspCubeUser, { nullable: true, cascade: true })
  @JoinColumn()
  ispCubeUser: IspCubeUser | null;

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaign: Campaign[];
}
