import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { QueryModule } from "src/core/query/query.module";
import { ProfileModule } from "src/features/profiles/profile.module";

import { AuthenticationModule } from "../authentication/authentication.module";
import { CreateJournalEntryHandler } from "./application/handlers/command-handlers/create-journal-entry.handler";
import { GetJournalHandler } from "./application/handlers/query-handlers/get-journal.handler";
import { JournalController } from "./client/controllers/journal.controller";
import { JournalEntry } from "./infrastructure/entities/journal-entry.entity";
import { JournalLogger } from "./journal.listener";

@Module({
  imports: [
    AuthenticationModule,
    CqrsModule,
    ProfileModule,
    TypeOrmModule.forFeature([JournalEntry]),
    QueryModule,
  ],
  controllers: [JournalController],
  providers: [CreateJournalEntryHandler, GetJournalHandler, JournalLogger],
})
export class JournalModule {}
