import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { CompartmentDto, UpdateCompartmentDto } from "./dto/compartment.dto";

@Injectable()
export class CompartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createCompartment(compartment: CompartmentDto) {
    const { capacity, unitId } = compartment;

    const unit = await this.prisma.unit.findUnique({
      where: {
        id: unitId,
      },
      include: {
        compartments: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!unit) {
      throw new BadRequestException("Unit does not exist.");
    }

    const count = unit.compartments.length;

    if (count === 4) {
      throw new BadRequestException("Unit is full.");
    }

    try {
      return await this.prisma.compartment.create({
        data: {
          capacity,
          macAddress: `${unit.macAddress}-${count + 1}`,
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

  async updateCompartment(id: number, compartment: UpdateCompartmentDto) {
    const { capacity } = compartment;

    try {
      return await this.prisma.compartment.update({
        where: {
          id,
        },
        data: {
          capacity,
        },
      });
    } catch (_e) {
      return null;
    }
  }

  async deleteCompartment(id: number) {
    const compartment = await this.prisma.compartment.findUnique({
      where: {
        id,
      },
      select: {
        unit: true,
      },
    });

    if (!compartment) {
      throw new NotFoundException("Compartment does not exist.");
    }

    const compartmentsInUnit = await this.prisma.compartment.findMany({
      where: {
        unitId: compartment.unit.id,
      },
      orderBy: {
        id: "asc",
      },
    });

    const remainingCompartments = compartmentsInUnit.filter(
      (compartment) => compartment.id !== id,
    );

    try {
      await this.prisma.compartment.delete({
        where: {
          id,
        },
      });
      return await this.prisma.unit.update({
        where: {
          id: compartment.unit.id,
        },
        data: {
          compartments: {
            update: remainingCompartments.map((c, index) => ({
              where: {
                id: c.id,
              },
              data: {
                macAddress: `${compartment.unit.macAddress}-${index + 1}`,
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
}
