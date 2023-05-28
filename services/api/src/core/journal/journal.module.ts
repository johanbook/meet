import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileDomainModule } from "src/domain/profiles/profile-domain.module";

import { CreateJournalEntryHandler } from "./application/handlers/command-handlers/create-journal-entry.handler";
import { JournalController } from "./client/controllers/journal.controller";
import { JournalEntry } from "./infrastructure/entities/journal-entry.entity";
import { JournalLogger } from "./journal.listener";

@Module({
  imports: [
    CqrsModule,
    ProfileDomainModule,
    TypeOrmModule.forFeature([JournalEntry]),
  ],
  controllers: [JournalController],
  providers: [CreateJournalEntryHandler, JournalLogger],
})
export class JournalModule {}
