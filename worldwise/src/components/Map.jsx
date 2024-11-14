import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "./Button";
import { useGeoPosition } from "../../hooks/useGeoPosition";
function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const navigate = useNavigate();
  const {
    isLoading: isLoadingPosition,
    position: { lat, lng },
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useGeoPosition();
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (lat && lng !== null) {
        setMapPosition([lat, lng]);
      }
    },
    [lat, lng]
  );
  return (
    <div className={styles.mapContainer}>
      {!(lat && lng) && (
        <Button type="position" onClick={() => getPosition()}>
          {isLoadingPosition ? "Loading..." : "Use my location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeView position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
  function ChangeView({ position }) {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
  }
  function DetectMapClick() {
    const map = useMap();
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    });
    return null;
  }
}

export default Map;
