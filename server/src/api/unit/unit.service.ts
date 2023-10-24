import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { UnitDto } from "./dto/unit.dto";

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  getUnit(id: number) {
    return this.prisma.unit.findUnique({
      where: {
        id,
      },
      include: {
        compartments: true,
      },
    });
  }

  async getUnits() {
    return this.prisma.unit.findMany({
      include: {
        location: true,
      },
    });
  }

  async createUnit(unit: UnitDto) {
    const { name, capacity, macAddress, locationId } = unit;

    try {
      return await this.prisma.unit.create({
        data: {
          name,
          capacity,
          macAddress,
          location: {
            connect: {
              id: locationId,
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateUnit(id: number, unit: UnitDto) {
    const { name, capacity, macAddress, locationId } = unit;

    const existingCompartments = await this.prisma.compartment.findMany({
      where: {
        unitId: id,
      },
      orderBy: {
        id: "asc",
      },
    });

    try {
      return await this.prisma.unit.update({
        where: {
          id,
        },
        data: {
          name,
          capacity,
          macAddress,
          location: {
            connect: {
              id: locationId,
            },
          },
          compartments: {
            update: existingCompartments.map((compartment, index) => ({
              where: {
                id: compartment.id,
              },
              data: {
                macAddress: `${macAddress}-${index + 1}`,
              },
            })),
          },
        },
        include: {
          compartments: {
            orderBy: {
              id: "asc",
            },
          },
        },
      });
    } catch (_e) {
      return null;
    }
  }

  async deleteUnit(id: number) {
    try {
      return await this.prisma.unit.delete({
        where: {
          id,
        },
      });
    } catch (_e) {
      return null;
    }
  }
}
