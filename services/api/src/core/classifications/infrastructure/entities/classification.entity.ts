import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["uuid", "locale"])
export class Classification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 255 })
  category!: string;

  @CreateDateColumn()
  created!: Date;

  @Column("varchar", { length: 512 })
  label!: string;

  @Column("varchar", { length: 16 })
  locale!: string;

  @Column("boolean", { default: false })
  manual!: boolean;

  @Column("boolean", { default: false })
  obsolete!: boolean;

  @Column("uuid", { nullable: true })
  parentUuid?: string;

  @Column("uuid")
  uuid!: string;
}
