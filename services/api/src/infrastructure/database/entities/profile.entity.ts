import {
  Column,
  Entity,
  Index,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ProfilePhoto } from "./profile-photo.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 1024 })
  description!: string;

  @Column({ length: 128 })
  name!: string;

  @OneToMany(() => ProfilePhoto, (photo) => photo.profile)
  photos!: ProfilePhoto[];

  @Column({ type: "point" })
  recentLocation!: Point;

  @Index({ unique: true })
  @Column({ length: 128 })
  userId!: string;
}
