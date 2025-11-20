import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Default marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Custom red icon for center location
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ✅ Helper: recenter map when props change
function RecenterMap({ center }) {
  const map = useMap();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return null;
}

const MapView = ({ donors = [], center }) => {
  if (!center) return <p style={{ textAlign: "center" }}>Fetching location...</p>;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {/* 🔴 Center marker */}
      <Marker position={center} icon={redIcon}>
        <Popup>Selected Location</Popup>
      </Marker>

      {/* 🩸 Donors */}
      {donors.map((donor, idx) => (
        <Marker key={idx} position={[donor.latitude, donor.longitude]}>
          <Popup>
            <strong>{donor.name}</strong> <br />
            Blood Group: {donor.blood_group} <br />
            Contact: {donor.contact}
          </Popup>
        </Marker>
      ))}

      <RecenterMap center={center} />
    </MapContainer>
  );
};

export default MapView;
