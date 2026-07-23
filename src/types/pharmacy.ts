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
export type Profile = {
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  approved: boolean;
};
