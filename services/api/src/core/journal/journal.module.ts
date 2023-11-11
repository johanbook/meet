import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationModule } from "src/core/authentication/authentication.module";
import { OrganizationModule } from "src/core/organizations/organization.module";
import { ProfileModule } from "src/core/profiles/profile.module";
import { QueryModule } from "src/core/query/query.module";

import { CreateJournalEntryHandler } from "./application/handlers/command-handlers/create-journal-entry.handler";
import { GetCurrentOrganizationJournalHandler } from "./application/handlers/query-handlers/get-current-organization-journal.handler";
import { GetProfileJournalHandler } from "./application/handlers/query-handlers/get-profile-journal.handler";
import { JournalController } from "./client/controllers/journal.controller";
import { JournalEntry } from "./infrastructure/entities/journal-entry.entity";
import { JournalLogger } from "./journal.listener";

@Module({
  imports: [
    AuthenticationModule,
    CqrsModule,
    OrganizationModule,
    ProfileModule,
    TypeOrmModule.forFeature([JournalEntry]),
    QueryModule,
  ],
  controllers: [JournalController],
  providers: [
    CreateJournalEntryHandler,
    GetCurrentOrganizationJournalHandler,
    GetProfileJournalHandler,
    JournalLogger,
  ],
})
export class JournalModule {}
