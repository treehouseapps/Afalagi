import { Suspense } from "react";
import PharmaciesContent from "./PharmaciesContent";

export default function PharmaciesPage() {
  return (
    <Suspense fallback={<div>Loading pharmacies...</div>}>
      <PharmaciesContent />
    </Suspense>
  );
}
