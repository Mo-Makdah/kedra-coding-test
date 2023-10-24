import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { LocationModule } from "./api/location/location.module";
import { UnitModule } from "./api/unit/unit.module";
import { CompartmentModule } from "./api/compartment/compartment.module";

@Module({
  imports: [PrismaModule, LocationModule, UnitModule, CompartmentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
