import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UnitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  capacity: number;

  @IsNotEmpty()
  @IsString()
  macAddress: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  locationId: number;
}
