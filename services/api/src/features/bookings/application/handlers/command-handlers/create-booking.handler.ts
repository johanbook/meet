import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";

import { BookingsService } from "../../../domain/services/bookings.service";
import { Booking } from "../../../infrastructure/entities/booking.entity";
import { CreateBookingCommand } from "../../contracts/commands/create-booking.command";

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler implements ICommandHandler<
  CreateBookingCommand,
  void
> {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async execute(command: CreateBookingCommand): Promise<void> {
    const organizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();
    const profileId = await this.currentProfileService.fetchCurrentProfileId();

    const booking = new Booking();

    booking.name = command.name;
    booking.description = command.description;
    booking.startTime = command.startTime;
    booking.endTime = command.endTime;
    booking.organizationId = organizationId;
    booking.profileId = profileId;

    await this.bookingsService.createBooking(booking);
  }
}
