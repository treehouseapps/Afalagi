import { number, string } from "zod/v4";

export interface Medicine {
  id: number;
  name: string;
  description?: string | null;
  genericName?: string | null;
  manufacturer?: string | null;
  category: string;
  sideEffect: string;
  expiryDate?: Date | string | null;
}

export type InventoryMedicine = {
  id: number;
  medicineId?: number;
  name: string;
  description?: string | null;
  genericName?: string | null;
  manufacturer?: string | null;
  category: string;
  price?: number | null;
  expiryDate?: Date | string | null;
};

export type CreateMedicineInput = {
  name: string;
  genericName?: string;
  description?: string;
  category: string;
  manufacturer?: string;
};

export type UpdateMedicineInput = {
  name: string;
  genericName?: string;
  description?: string;
  category: string;
  manufacturer?: string;
};

export type Pharmacy = {
  id: number;
  name: string;
  address: string;
  distance?: string;
};

export type InventoryPharmacy = {
  pharmacyId: number;
  medicineId: number;
  quantity: number;
  price: number | null;
  pharmacy: Pharmacy;
};
