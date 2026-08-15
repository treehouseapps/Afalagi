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

export type PharmacyListItem = {
  id: number;
  name: string;
  address: string;
  city?: string;
  phone?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  approved?: boolean;
  distance?: string;
};

export type Profile = {
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  documentUrl: string | null;
  documentStatus: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  approved: boolean;
};
export type Pharmacies = {
  id: number;
  ownerId: number;
  name: string;
  address: string;
  city: string;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  approved: boolean;
};
