"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";

export default function Map() {
  const pharmacyIcon = L.divIcon({
    html: renderToStaticMarkup(<MapPin />),
  });

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
      <Marker position={[8.9806, 38.7579]} icon={pharmacyIcon} />
    </MapContainer>
  );
}
