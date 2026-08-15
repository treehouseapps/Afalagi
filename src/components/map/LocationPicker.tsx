"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import type { LatLng } from "leaflet";

type Props = {
  latitude: number | null;
  longitude: number | null;
  onLocationSelect: (latitude: number, longitude: number) => void;
};

function LocationMarker({
  onLocationSelect,
}: {
  onLocationSelect: (latitude: number, longitude: number) => void;
}) {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      setPosition(event.latlng);

      onLocationSelect(lat, lng);
    },
  });

  if (!position) {
    return null;
  }

  return <Marker position={position} />;
}

export default function LocationPicker({
  latitude,
  longitude,
  onLocationSelect,
}: Props) {
  const defaultCenter: [number, number] = [9.03, 38.74];

  const center: [number, number] =
    latitude !== null && longitude !== null
      ? [latitude, longitude]
      : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
