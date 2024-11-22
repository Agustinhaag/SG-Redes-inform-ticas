import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, Matches } from "class-validator";

@Entity({ name: "credentials" })
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]).+$/, {
    message:
      "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un mínimo de 8 caracteres.",
  })
  password: string;
}
