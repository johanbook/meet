import { Module } from "@nestjs/common";

import { EmailService } from "./domain/services/email.service";

@Module({
  exports: [EmailService],
  imports: [],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
