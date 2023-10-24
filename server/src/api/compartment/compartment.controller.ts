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

import { CompartmentDto, UpdateCompartmentDto } from "./dto/compartment.dto";

@Controller("compartments")
export class CompartmentController {
  constructor(private readonly compartmentService: CompartmentService) {}

  @Post("")
  async createCompartment(@Body() body: CompartmentDto) {
    return this.compartmentService.createCompartment(body);
  }

  @Put(":id")
  async updateCompartment(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateCompartmentDto,
  ) {
    const compartment = await this.compartmentService.updateCompartment(
      id,
      body,
    );
    if (!compartment) throw new NotFoundException();
    return compartment;
  }

  @Delete(":id")
  async deleteCompartment(@Param("id", ParseIntPipe) id: number) {
    return this.compartmentService.deleteCompartment(id);
  }
}
