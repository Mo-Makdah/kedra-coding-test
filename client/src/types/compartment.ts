export type Compartment = {
  id: number;
  macAddress: string;
  capacity: number;
  unitId: number;
};

export type CompartmentFormType = {
  capacity: number;
  unitId: number;
};

export type UpdateCompartmentInputType = {
  capacity: number;
};
