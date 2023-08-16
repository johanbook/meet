import { Column } from "typeorm";

import { BaseEntity } from "src/core/database";

export abstract class BasePhoto extends BaseEntity {
  @Column({ type: "uuid" })
  objectId!: string;
}
