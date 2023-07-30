import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created!: Date;

  @Column("text")
  commandName!: string;

  @Column("json")
  payload!: unknown;

  @Column("uuid")
  userId!: string;
}
