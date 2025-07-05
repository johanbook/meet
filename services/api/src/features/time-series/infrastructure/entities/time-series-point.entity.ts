import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Profile } from "src/core/profiles";

import { TimeSeries } from "./time-series.entity";

@Entity()
export class TimeSeriesPoint extends BaseEntity {
  @Column({ type: "varchar", length: 4096, default: "" })
  description!: string;

  @Column({ type: "varchar", length: 256, default: "" })
  label!: string;

  @ManyToOne(() => TimeSeries, { onDelete: "CASCADE" })
  timeSeries!: TimeSeries;

  @Column()
  timeSeriesId!: string;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column({ type: "float" })
  value!: number;
}
