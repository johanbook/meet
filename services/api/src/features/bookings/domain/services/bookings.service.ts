import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Booking } from "../../infrastructure/entities/booking.entity";

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(booking: Booking): Promise<Booking> {
    return await this.bookingRepository.save(booking);
  }
}
