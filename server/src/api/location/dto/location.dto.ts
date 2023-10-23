import { IsNotEmpty, IsString } from "class-validator";

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  macAddress: string;
}
