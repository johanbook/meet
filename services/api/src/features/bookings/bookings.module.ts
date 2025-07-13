import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizationModule } from "src/core/organizations/organization.module";

import { GetBookingListQueryHandler } from "./application/handlers/query-handlers/get-booking-list.handler";
import { BookingsController } from "./client/controllers/bookings.controller";
import { Booking } from "./infrastructure/entities/booking.entity";

@Module({
  imports: [
    CqrsModule,
    OrganizationModule,
    TypeOrmModule.forFeature([Booking]),
  ],
  providers: [GetBookingListQueryHandler],
  controllers: [BookingsController],
  exports: [],
})
export class BookingsModule {}
