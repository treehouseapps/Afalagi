import dynamic from "next/dynamic";

const MapPage = dynamic(() => import("../../components/Map"), { ssr: false });
export default function Page() {
  return (
    <>
      <h1 className="text-6xl font-bold">Map</h1>

      <div className="mt-6">
        <MapPage />
      </div>
    </>
  );
}
