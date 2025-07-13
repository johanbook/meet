import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it } from "src/test";
import { TestSuite } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { BookingsService } from "../../../domain/services/bookings.service";
import { Booking } from "../../../infrastructure/entities/booking.entity";
import { CreateBookingCommand } from "../../contracts/commands/create-booking.command";
import { CreateBookingHandler } from "./create-booking.handler";

describe(CreateBookingHandler.name, () => {
  let bookingRepository: Repository<Booking>;
  let bookingsService: BookingsService;
  let commandHandler: CreateBookingHandler;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();
    bookingRepository = createMockRepository<Booking>();
    bookingsService = new BookingsService(bookingRepository);
    commandHandler = new CreateBookingHandler(
      bookingsService,
      testSuite.currentOrganizationService,
      testSuite.currentProfileService,
    );
  });

  describe("can create booking", () => {
    it("should save changes to booking", async () => {
      const command = map(CreateBookingCommand, {
        name: "my-booking",
        description: "my-description",
        startTime: new Date("2025-01-01"),
        endTime: new Date("2025-01-02"),
      });

      await commandHandler.execute(command);

      const savedBooking = await bookingRepository.find();
      expect(savedBooking).toHaveLength(1);
    });
  });
});
