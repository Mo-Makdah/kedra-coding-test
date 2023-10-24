import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { UnitService } from "./unit.service";

import { plainToInstance } from "class-transformer";
import { Unit } from "./entities/unit.entity";
import { UnitDto } from "./dto/unit.dto";

@Controller("units")
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get("")
  async getUnits() {
    const units = await this.unitService.getUnits();
    return plainToInstance(Unit, units);
  }

  @Get(":id")
  async getUnit(@Param("id", ParseIntPipe) id: number) {
    const unit = await this.unitService.getUnit(id);
    if (!unit) throw new NotFoundException();
    return unit;
  }

  @Post("")
  async createUnit(@Body() body: UnitDto) {
    return this.unitService.createUnit(body);
  }

  @Put(":id")
  async updateUnit(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UnitDto,
  ) {
    const unit = await this.unitService.updateUnit(id, body);
    if (!unit) throw new NotFoundException();
    return unit;
  }

  @Delete(":id")
  async deleteUnit(@Param("id", ParseIntPipe) id: number) {
    const unit = await this.unitService.deleteUnit(id);
    if (!unit) throw new NotFoundException();
    return unit;
  }
}
