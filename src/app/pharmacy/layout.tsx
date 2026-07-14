import type { ReactNode } from "react";
import PharmacyShell from "./pharmacy-shell";

export default function PharmacyLayout({ children }: { children: ReactNode }) {
  return <PharmacyShell>{children}</PharmacyShell>;
}
