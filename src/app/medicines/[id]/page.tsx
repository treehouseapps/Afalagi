import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  AlertCircle,
  Pill,
  Navigation2,
  Map as MapIcon,
  Activity,
  CheckCircle2,
  Info,
  Building2,
  Clock3,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getMedicineById } from "@/actions/medicine";
import { getPharmacyList } from "@/actions/pharmacy";
import { PharmacyListItem } from "@/types/pharmacy";
import PharmacyList from "@/components/pharmacy/PharmacyList";
import dynamic from "next/dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function MedicineDetailPage({ params }: Props) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const [medicineRes, pharmacyRes] = await Promise.all([
    getMedicineById(Number(id)),
    getPharmacyList(Number(id)),
  ]);

  if (!medicineRes || medicineRes.length === 0) {
    notFound();
  }

  const availablePharmacies: PharmacyListItem[] = (
    (pharmacyRes?.pharmacy ?? []) as any[]
  ).map((inventoryItem) => ({
    id: inventoryItem.pharmacy.id,
    name: inventoryItem.pharmacy.name,
    address: inventoryItem.pharmacy.address,
    city: inventoryItem.pharmacy.city,
    phone: inventoryItem.pharmacy.phone,
    latitude: inventoryItem.pharmacy.latitude,
    longitude: inventoryItem.pharmacy.longitude,
    approved: inventoryItem.pharmacy.approved,
    distance: inventoryItem.pharmacy.distance,
  }));

  const MapPage = dynamic(() => import("@/components/map/Map"), {
    ssr: false,
  });

  const medicineData = medicineRes;

  return (
    <div className="list-page">
      <Navbar />

      <main className="list-main">
        <div className="list-search-panel">
          <Link href="/medicines" className="back-link">
            <ArrowLeft size={18} />
            Back to Medicines
          </Link>
        </div>

        <div className="list-header">
          <span className="category-pill">
            {medicineData[0].medicine.category}
          </span>

          <h1>{medicineData[0].medicine.name}</h1>

          <div className="search-box">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="list-container single-col">
          <div className="filter-header">
            <Info size={20} />
            <h2>Medicine Information</h2>
          </div>

          <div className="items-grid">
            <div className="item-card">
              <div className="filter-header">
                <Pill size={20} />
                <span>Description</span>
              </div>

              <p>{medicineData[0].medicine.description}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <Activity size={20} />
                <span>Recommended Dosage</span>
              </div>

              <p>{medicineData[0].medicine.dosage}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <AlertCircle size={20} />
                <span>Possible Side Effects</span>
              </div>

              <p>{medicineData[0].medicine.sideEffect}</p>
            </div>
          </div>
        </div>

        <br />
        <br />
        <PharmacyList Pharmacies={availablePharmacies} />

        <div className="mt-6">
          <MapPage pharmacies={availablePharmacies} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
