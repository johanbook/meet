import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Classification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 255 })
  category!: string;

  @CreateDateColumn()
  created!: Date;

  @Column("varchar", { length: 512 })
  label!: string;

  @Column("uuid")
  uuid!: string;
}
