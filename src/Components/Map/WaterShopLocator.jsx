import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import useLocationStore from "../../Zustand/LocationGet";

// Icons
const waterIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Geocoder control
function GeocoderControl() {
  const map = useMap();
  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
    })
      .on("markgeocode", function (e) {
        const bbox = e.geocode.bbox;
        const bounds = L.latLngBounds(
          [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
          [bbox.getNorthWest().lat, bbox.getNorthWest().lng]
        );
        map.fitBounds(bounds);
      })
      .addTo(map);
    return () => {
      map.removeControl(geocoder);
    };
  }, [map]);
  return null;
}

// User location marker
function UserLocationMarker({ setUserPosition }) {
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setUserPosition(e.latlng);
    });
  }, [map, setUserPosition]);
  return null;
}

// Add new marker
function AddMarkerOnClick({ onAddMarker }) {
  useMapEvents({
    click(e) {
      const name = prompt("Enter shop name:");
      if (name) {
        onAddMarker({
          id: Date.now(),
          name,
          address: "Custom Location",
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      }
    },
  });
  return null;
}

export default function WaterShopLocator() {
  const mapRef = useRef();
  const [userPosition, setUserPosition] = useState(null);
  const [shops, setShops] = useState([]);
  const [activeShopId, setActiveShopId] = useState(null);

  const { location, fetchLocation, loading, error } = useLocationStore();

  // Fetch data from store
  useEffect(() => {
    fetchLocation();
  }, []);
console.log("Location data:", location);
  // Transform response to usable format
  useEffect(() => {
    if (location?.stores?.length > 0) {
      const mapped = location.stores.map((store) => ({
        id: store._id,
        name: store.name,
        address: store.address,
        lat: store.location.coordinates[1], // latitude
        lng: store.location.coordinates[0], // longitude
      }));
      setShops(mapped);
    }
  }, [location]);

  // On click from list
  const onShopClick = (shop) => {
    if (!mapRef.current) return;
    mapRef.current.setView([shop.lat, shop.lng], 15, {
      animate: true,
    });
    setActiveShopId(shop.id);
  };

  if (loading) return <p className="text-center p-6">Loading store locations...</p>;
  if (error) return <p className="text-center p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full p-4 min-h-[600px]">
      {/* Map Section */}
      <div className="flex-1 min-w-[300px] z-40 h-[400px] md:h-[600px]">
        <MapContainer
          center={[12.9716, 77.5946]} // Bangalore as center
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeocoderControl />
          <UserLocationMarker setUserPosition={setUserPosition} />
          <AddMarkerOnClick
            onAddMarker={(newShop) => setShops((prev) => [...prev, newShop])}
          />

          {/* User Marker */}
          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* Store Markers */}
          {shops.map((shop) => (
            <Marker
              key={shop.id}
              position={[shop.lat, shop.lng]}
              icon={waterIcon}
              eventHandlers={{ click: () => setActiveShopId(shop.id) }}
            >
              {activeShopId === shop.id && (
                <Popup
                  position={[shop.lat, shop.lng]}
                  onClose={() => setActiveShopId(null)}
                >
                  <strong>{shop.name}</strong>
                  <br />
                  {shop.address}
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Store List */}
      <div className="w-full md:w-80 max-h-[600px] overflow-y-auto border border-gray-300 rounded-md p-4 bg-white">
        <h3 className="text-xl font-semibold mb-4 text-center">Stores List</h3>
        {shops.length === 0 ? (
          <p className="text-center text-gray-500">No shops found.</p>
        ) : (
          <ul>
            {shops.map((shop) => (
              <li
                key={shop.id}
                className="cursor-pointer mb-3 p-3 rounded-md hover:bg-blue-50 transition"
                onClick={() => onShopClick(shop)}
              >
                <p className="font-semibold text-[#0077B6]">{shop.name}</p>
                <p className="text-sm text-gray-600">{shop.address}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
