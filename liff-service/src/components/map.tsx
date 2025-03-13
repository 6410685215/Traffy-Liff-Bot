import
{
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap
} from "react-leaflet";
import L from "leaflet";

import markerIcon from "/liff-icons/location_on.svg";
import "./map.css";

const API_KEY = import.meta.env.VITE_MAP_API_KEY;
// OpenStreetMap topo base by Traces Track
const urlMap = `https://tile.tracestrack.com/topo_th/{z}/{x}/{y}.png?key=${API_KEY}`;
// google map
// const urlMap =  "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}";


interface MapProps {
    location: { latitude: number, longitude: number } | null;
    address: string | null;
}

const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const Map: React.FC<MapProps> = ({ location, address }) => {

    return (
        <MapContainer center={location ? [location.latitude, location.longitude] : [13.740630, 100.531737]} zoom={12} scrollWheelZoom={true} className="map-container">
            <ChangeView center={location ? [location.latitude, location.longitude] : [13.740630, 100.531737]} zoom={15} />
            <TileLayer
                url={urlMap}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {address && location &&
                <Marker position={[location.latitude, location.longitude]} icon={customIcon}>
                    <Popup>
                        {address}
                    </Popup>
                </Marker>
            }
        </MapContainer>
    );
};

export default Map;