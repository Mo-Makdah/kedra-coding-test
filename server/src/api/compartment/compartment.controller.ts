import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { CompartmentService } from "./compartment.service";

import { CompartmentDto } from "./dto/compartment.dto";

@Controller("compartments")
export class CompartmentController {
  constructor(private readonly compartmentService: CompartmentService) {}

  @Post("")
  async createCompartment(@Body() body: CompartmentDto) {
    return this.compartmentService.createUnit(body);
  }

  @Put(":id")
  async updateUnit(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: CompartmentDto,
  ) {
    const product = await this.compartmentService.updateCompartment(id, body);
    if (!product) throw new NotFoundException();
    return product;
  }

  @Delete(":id")
  async deleteUnit(@Param("id", ParseIntPipe) id: number) {
    const product = await this.compartmentService.deleteCompartment(id);
    if (!product) throw new NotFoundException();
    return product;
  }
}
