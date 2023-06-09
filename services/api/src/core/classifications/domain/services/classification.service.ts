import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Classification } from "../../infrastructure/entities/classification.entity";

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private readonly classifications: Repository<Classification>,
  ) {}

  async fetchClassificationsByCategory(
    category: string,
  ): Promise<Classification[]> {
    return this.classifications.find({ where: { category } });
  }
}
