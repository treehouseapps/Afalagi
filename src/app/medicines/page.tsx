import { Suspense } from "react";
import MedicinesContent from "./MedicinesContent";

export default function MedicinesPage() {
  return (
    <Suspense fallback={<div>Loading medicines...</div>}>
      <MedicinesContent />
    </Suspense>
  );
}
