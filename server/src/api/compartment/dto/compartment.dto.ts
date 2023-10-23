import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CompartmentDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  unitId: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  capacity: number;

  @IsNotEmpty()
  @IsString()
  macAddress: string;
}
