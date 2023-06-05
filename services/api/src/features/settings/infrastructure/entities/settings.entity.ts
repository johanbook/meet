import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @Column("boolean")
  darkmode!: boolean;

  @Column("uuid")
  userId!: string;
}
