import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";

import { Booking } from "../../../infrastructure/entities/booking.entity";
import { BookingDetails } from "../../contracts/dtos/booking.dto";
import { GetBookingListQuery } from "../../contracts/queries/get-booking-list.query";

@QueryHandler(GetBookingListQuery)
export class GetBookingListQueryHandler
  implements IQueryHandler<GetBookingListQuery, BookingDetails[]>
{
  constructor(
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    private readonly currentOrganizationService: CurrentOrganizationService,
  ) {}

  async execute(): Promise<BookingDetails[]> {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const bookings = await this.bookings.find({
      where: {
        organizationId: currentOrganizationId,
      },
    });

    return mapArray(BookingDetails, bookings, (booking) => ({
      id: booking.id,
      description: booking.description,
      endTime: booking.endTime,
      name: booking.name,
      profileId: booking.profileId,
      startTime: booking.startTime,
    }));
  }
}
