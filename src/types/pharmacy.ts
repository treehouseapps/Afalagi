export interface Pharmacy {
  id: number;
  ownerId: number;
  name: string;
  address: string;
  city: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  approved: boolean;
}
