import { Compartment } from "./compartment";

export type Unit = {
  id: number;
  name: string;
  macAddress: string;
  capacity: number;
  locationId: number;
  location?: string;
  compartments: Compartment[];
};

export type UnitFormType = Omit<Unit, "id" | "location" | "compartments">;
