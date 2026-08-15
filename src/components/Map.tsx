"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import L, { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import type { Pharmacy } from "@/types/pharmacy";

function MapController({ pharmacies }: { pharmacies: Pharmacy[] }) {
  const map = useMap();

  useEffect(() => {
    const locations = pharmacies.filter(
      (pharmacy) => pharmacy.latitude !== null && pharmacy.longitude !== null,
    );

    const bounds: LatLngTuple[] = locations.map((pharmacy) => [
      pharmacy.latitude!,
      pharmacy.longitude!,
    ]);

    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [map, pharmacies]);

  return null;
}

export default function Map({ pharmacies }: { pharmacies: Pharmacy[] }) {
  const pharmacyIcon = L.divIcon({
    html: renderToStaticMarkup(<MapPin size={40} />),
    className: "custom-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const filtered = pharmacies.filter(
    (
      pharmacy,
    ): pharmacy is Pharmacy & {
      latitude: number;
      longitude: number;
    } => pharmacy.latitude !== null && pharmacy.longitude !== null,
  );

  return (
    <MapContainer
      center={[8.9806, 38.7579]}
      zoom={15}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {filtered.map((pharmacy) => (
        <Marker
          key={pharmacy.id}
          position={[pharmacy.latitude, pharmacy.longitude]}
          icon={pharmacyIcon}
        >
          <Popup>
            <strong>{pharmacy.name}</strong>
            <br />
            {pharmacy.address}
          </Popup>
        </Marker>
      ))}

      <MapController pharmacies={pharmacies} />
    </MapContainer>
  );
}
