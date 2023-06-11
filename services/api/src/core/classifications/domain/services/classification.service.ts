import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

import { Classification } from "../../infrastructure/entities/classification.entity";

interface FetchClassificationsByCategoryProps {
  category: string;
  includeManual?: boolean;
  includeObsolete?: boolean;
  locale: string;
}

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private readonly classifications: Repository<Classification>,
  ) {}

  async fetchClassificationsByCategory({
    category,
    includeManual = false,
    includeObsolete = false,
    locale,
  }: FetchClassificationsByCategoryProps): Promise<Classification[]> {
    const whereOptions: FindOneOptions<Classification>["where"] = {
      category,
      locale,
    };

    if (!includeManual) {
      whereOptions.manual = false;
    }

    if (!includeObsolete) {
      whereOptions.obsolete = false;
    }

    return this.classifications.find({
      where: whereOptions,
    });
  }
}
