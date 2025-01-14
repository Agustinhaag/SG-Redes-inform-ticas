import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { StatusCampaign } from "../utils/types";
import { Message } from "./Messages";

@Entity("campaign")
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column({
    type: "enum",
    enum: StatusCampaign,
    default: StatusCampaign.PROCESS,
  })
  status: StatusCampaign;

  @Column({ type: "text" })
  message: string;

  @Column({ type: "text", array: true })
  recipients: string[]; // Lista de números de teléfono

  @ManyToOne(() => User, (user) => user.campaign, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;
  
  @OneToMany(() => Message, (message) => message.campaign, {
    cascade: true,
  })
  messages: Message[];
}
