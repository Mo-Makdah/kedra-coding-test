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
import { LocationService } from "./location.service";

import { LocationDto } from "./dto/location.dto";

@Controller("locations")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get("")
  async getLocations() {
    return this.locationService.getLocations();
  }

  @Post("")
  async createLocation(@Body() body: LocationDto) {
    return this.locationService.createLocation(body);
  }

  @Put(":id")
  async updateLocationById(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: LocationDto,
  ) {
    const location = await this.locationService.updateLocationById(id, body);
    if (!location) throw new NotFoundException();
    return location;
  }

  @Delete(":id")
  async deleteLocationById(@Param("id", ParseIntPipe) id: number) {
    const location = await this.locationService.deleteLocationById(id);
    if (!location) throw new NotFoundException();
    return location;
  }
}
