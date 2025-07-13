import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizationModule } from "src/core/organizations/organization.module";
import { ProfileModule } from "src/core/profiles/profile.module";

import { CreateBookingHandler } from "./application/handlers/command-handlers/create-booking.handler";
import { GetBookingListQueryHandler } from "./application/handlers/query-handlers/get-booking-list.handler";
import { BookingsController } from "./client/controllers/bookings.controller";
import { BookingsService } from "./domain/services/bookings.service";
import { Booking } from "./infrastructure/entities/booking.entity";

@Module({
  imports: [
    CqrsModule,
    OrganizationModule,
    ProfileModule,
    TypeOrmModule.forFeature([Booking]),
  ],
  providers: [
    BookingsService,
    CreateBookingHandler,
    GetBookingListQueryHandler,
  ],
  controllers: [BookingsController],
  exports: [],
})
export class BookingsModule {}
