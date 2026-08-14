"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";

export default function Map() {
  const pharmacyIcon = L.divIcon({
    html: renderToStaticMarkup(<MapPin size={40} />),
    className: "custom-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
      <Marker position={[8.9806, 38.7579]} icon={pharmacyIcon}>
        <Popup>
          <strong>Addis Pharmacy</strong>
          <br />
          Bole Road, Addis Ababa
        </Popup>
      </Marker>
    </MapContainer>
  );
}
