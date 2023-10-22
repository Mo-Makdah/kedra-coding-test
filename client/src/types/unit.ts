import { Location } from "./location";

export type Unit = {
  id: number;
  name: string;
  macAddress: string;
  capacity: number;
  locationId: number;
  locationAddress: Location["address"];
};
