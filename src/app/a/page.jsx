import dynamic from "next/dynamic";
import { getAllPharmacy } from "@/services/pharmacy.service";

const MapPage = dynamic(() => import("../../components/Map"), { ssr: false });
export default async function Page() {
  const pharmacies = await getAllPharmacy();
  return (
    <>
      <h1 className="text-6xl font-bold">Map</h1>

      <div className="mt-6">
        <MapPage pharmacies={pharmacies} />
      </div>
    </>
  );
}
