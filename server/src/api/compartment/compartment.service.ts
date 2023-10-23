import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { CompartmentDto } from "./dto/compartment.dto";

@Injectable()
export class CompartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompartments(unitId: number) {
    return this.prisma.compartment.findMany({
      where: {
        unitId,
      },
    });
  }

  async createUnit(compartment: CompartmentDto) {
    const { capacity, macAddress, unitId } = compartment;

    try {
      return await this.prisma.compartment.create({
        data: {
          capacity,
          macAddress,
          unit: {
            connect: {
              id: unitId,
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateCompartment(id: number, compartment: CompartmentDto) {
    const { capacity, macAddress } = compartment;

    try {
      return await this.prisma.compartment.update({
        where: {
          id,
        },
        data: {
          capacity,
          macAddress,
        },
      });
    } catch (_e) {
      return null;
    }
  }

  async deleteCompartment(id: number) {
    try {
      return await this.prisma.compartment.delete({
        where: {
          id,
        },
      });
    } catch (_e) {
      return null;
    }
  }
}
