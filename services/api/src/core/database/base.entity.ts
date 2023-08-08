import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({
    type: "timestamp without time zone",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp without time zone",
  })
  updatedAt!: Date;
}
