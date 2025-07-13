import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { BookingDetails } from "../../application/contracts/dtos/booking.dto";
import { GetBookingListQuery } from "../../application/contracts/queries/get-booking-list.query";

@Controller("bookings")
@ApiTags("bookings")
export class BookingsController {
  constructor(private queryBus: QueryBus) {}

  @Get("/events")
  async getBookingList(
    @Query() query: GetBookingListQuery,
  ): Promise<BookingDetails[]> {
    return await this.queryBus.execute(query);
  }
}
