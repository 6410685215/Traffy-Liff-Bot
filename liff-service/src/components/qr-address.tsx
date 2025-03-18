import
{
    Button,
    Form,
    Card,
    InputGroup,
    Offcanvas
} from "react-bootstrap";
import { useEffect, useState } from "react";
import QrScanner from "../components/qr-reader";
import { BsQrCodeScan } from "react-icons/bs";
import axios from "axios";

import Map from "./map";

import 'bootstrap/dist/css/bootstrap.min.css';
import './qr-address.css';

interface QrAddressProps {
    uuid_qr: (result: string) => void;
    address: (result: string) => void;
    loc: (result: { latitude: number, longitude: number } | null) => void;
}

const qrAddress: React.FC<QrAddressProps> = ({ uuid_qr, address, loc }) => {
    const [state, setState] = useState(false);
    const [uuidQr, setUuid] = useState('');
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [addr, setAddr] = useState<string | null>(null);

    const handleScan = (data: any) => {
        if (data) {
            const urlParams = new URLSearchParams(new URL(data).search);
            const uuid = urlParams.get('key') || '';
            uuid_qr(uuid);
            setUuid(uuid);
            setState(false);
        }
    }

    const handleClose = () => setState(false);
    const handleShow = () => setState(true);

    const handleSharelocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    latitude: latitude,
                    longitude: longitude
                });
                loc({
                    latitude: latitude,
                    longitude: longitude
                });
                getAddress(latitude, longitude);
            });
        }
    };

    const getAddress = async (latitude: number, longitude: number): Promise<void> => {
        const options = {
            method: 'GET',
            url: 'https://feroeg-reverse-geocoding.p.rapidapi.com/address',
            params: {
                lat: latitude,
                lon: longitude,
                lang: 'th',
                mode: 'text',
                format: "'[SN[, ] - [23456789ab[, ]'"
            },
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
                'x-rapidapi-host': 'feroeg-reverse-geocoding.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            address(response.data);
            setAddr(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Card.Header className="text-center">
                <h5 className="mb-0">หน่วยงาน / ตำแหน่ง</h5>
            </Card.Header>
            <Card.Body>
            <Form.Label>สแกน QR Code / กรอกรหัสหน่วยงาน</Form.Label>
            <InputGroup className="uuid-qr-input p-1">
                <Form.Control
                    type="text"
                    placeholder="UUID-QR"
                    value={uuidQr}
                    onChange={(e) => setUuid(e.target.value)}
                    required
                />
                <InputGroup.Text className="scan-btn p-0 ps-2">
                    <Button variant="dark" onClick={handleShow}>
                        <BsQrCodeScan />
                    </Button>
                </InputGroup.Text>
            </InputGroup>
            </Card.Body>
            <Offcanvas show={state} onHide={handleClose} placement="bottom" className="offcanvas-transform">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Scan QR Code</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <QrScanner onScan={handleScan} />
                </Offcanvas.Body>
            </Offcanvas>

            <Form.Label className="ms-3">แชร์ตำแหน่ง</Form.Label>
            <Card.Body className="text-center pt-0">
                <Map
                    location={location}
                    address={addr}
                />
                <div className="d-flex flex-row justify-content-between map-detail">
                {addr ? (
                        <p>{addr}</p>
                    ) : (
                        <p>* กรุณาแชร์ตำแหน่ง</p>
                    )
                }
                <Button
                    variant="danger"
                    className="mt-3"
                    onClick={handleSharelocation}
                >
                    แชร์ตำแหน่ง
                </Button>
                </div>
            </Card.Body>
        </>
    );
}

export default qrAddress;