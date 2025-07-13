import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateBookingCommand } from "../../application/contracts/commands/create-booking.command";
import { BookingDetails } from "../../application/contracts/dtos/booking.dto";
import { GetBookingListQuery } from "../../application/contracts/queries/get-booking-list.query";

@Controller("bookings")
@ApiTags("bookings")
export class BookingsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async createBooking(@Body() command: CreateBookingCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Get("/events")
  async getBookingList(
    @Query() query: GetBookingListQuery,
  ): Promise<BookingDetails[]> {
    return await this.queryBus.execute(query);
  }
}
