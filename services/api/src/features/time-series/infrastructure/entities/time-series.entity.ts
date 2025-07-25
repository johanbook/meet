import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "src/core/database";
import { Organization } from "src/core/organizations";
import { Profile } from "src/core/profiles";

import { TimeSeriesSummaryEnum } from "../../time-series-summary.enum";
import { TimeSeriesPoint } from "./time-series-point.entity";

@Entity()
export class TimeSeries extends BaseEntity {
  @Column({ type: "varchar", length: 2048, default: "" })
  description!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @ManyToOne(() => Organization, { onDelete: "CASCADE" })
  organization!: Organization;

  @Column()
  organizationId!: number;

  @OneToMany(() => TimeSeriesPoint, (point) => point.timeSeries, {
    cascade: true,
  })
  points!: TimeSeriesPoint[];

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  profile!: Profile;

  @Column()
  profileId!: number;

  @Column({
    type: "enum",
    enum: TimeSeriesSummaryEnum,
    default: TimeSeriesSummaryEnum.Monthly,
  })
  summary!: TimeSeriesSummaryEnum;
}
