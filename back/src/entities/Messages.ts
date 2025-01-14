import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Campaign } from "./Campaign";

@Entity("message")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", array: true })
  messageIds: string[]; // Array de IDs devueltos por las peticiones

  @ManyToOne(() => Campaign, (campaign) => campaign.messages, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "campaign_id" })
  campaign: Campaign;
}
