export interface Medicine {
  id: number;
  name: string;
  description?: string | null;
  genericName?: string | null;
  manufacturer?: string | null;
  category: string;
}

export type CreateMedicineInput = {
  name: string;
  genericName?: string;
  description?: string;
  category: string;
  manufacturer?: string;
  price?: number;
};

export type UpdateMedicineInput = {
  name: string;
  genericName?: string;
  description?: string;
  category: string;
  manufacturer?: string;
  price?: number;
};
