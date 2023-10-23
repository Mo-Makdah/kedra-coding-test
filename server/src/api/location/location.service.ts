import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { LocationDto } from "./dto/location.dto";

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async getLocations() {
    return this.prisma.location.findMany();
  }

  async createLocation(location: LocationDto) {
    const { macAddress, address } = location;

    return this.prisma.location.create({
      data: {
        macAddress,
        address,
      },
    });
  }

  async updateLocationById(id: number, location: LocationDto) {
    const { macAddress, address } = location;

    try {
      return await this.prisma.location.update({
        where: {
          id,
        },
        data: {
          macAddress,
          address,
        },
      });
    } catch (_e) {
      return null;
    }
  }

  async deleteLocationById(id: number) {
    try {
      return await this.prisma.location.delete({
        where: {
          id,
        },
      });
    } catch (_e) {
      return null;
    }
  }
}
