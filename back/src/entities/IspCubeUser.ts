import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ispcube" })
export class IspCubeUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  apiKey: string;

  @Column()
  @IsNotEmpty()
  clientId: string;
}
