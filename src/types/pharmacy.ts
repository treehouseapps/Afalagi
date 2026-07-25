export interface Pharmacy {
  id: number;
  ownerId: number;
  name: string;
  address: string;
  city: string;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
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
