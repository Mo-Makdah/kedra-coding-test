import { Transform } from "class-transformer";

export class Unit {
  @Transform(({ value }) => value.address)
  location: string;
}
