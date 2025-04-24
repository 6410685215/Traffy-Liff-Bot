import {
    useEffect,
    useState
} from "react";
import axios from "axios";

import {
    Card,
    Offcanvas,
    Button,
    InputGroup,
    Form,
    Container,
    Row,
    Col
} from "react-bootstrap";

import {
    QrScanner
} from "../components";

import { FaGear } from "react-icons/fa6";
import { BsAndroid2, BsQrCodeScan } from "react-icons/bs";

export default function Setting() {
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState(false);
    const [uuidQr, setUuid] = useState('');
    const [org_name, setOrgName] = useState('');
    const [uuidValid, setUuidValid] = useState<boolean | null>(null);

    useEffect( () => {
        const fetchData = async () => {
            try {
                const groupId = new URLSearchParams(window.location.search).get('groupId') || '';
                const org = await axios.get<{ status: string, default: { id: string, uuid_qr: string, org_name: string, org_id: string } }>(`/backend/get/api/default/${groupId}`);
                if (org.data.status === 'OK') {
                    setUuid(org.data.default.uuid_qr);
                    setOrgName(org.data.default.org_name);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleClose = () => setState(false);
    const handleShow = () => setState(true);
    const handleScan = async (data: string) => {
        const param = new URLSearchParams(new URL(data).search);
        if (param.has('key')) {
            setUuid(param.get('key') || '');
            await handleUuidCheck(param.get('key') || '');
        }
        setState(false);
    };

    const statusUUID = (status: boolean | null) => {
        switch (status) {
            case true:
                return "is-valid";
            case false:
                return "is-invalid";
            default:
                return "";
        }
    };

    const handleUuidCheck = async (uuid: string) => {
        const org = await axios.get<{ status: boolean,  message: { name: string, group_id: string } }>(`https://kong.traffy.in.th/core-dashboard-api/uuid-check?uuid=${uuid}`)
        if (!org.data.status) {
            setUuidValid(false);
            return;
        }
        setUuidValid(true);
        setOrgName(org.data.message.name);
    };

    if (isLoading) {
        return (
            <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <>
            {/* Header */}
            <Card className="head-form m-3">
                <Card.Body className="d-flex align-items-center">
                    <FaGear size={44} />
                    <h1 className="ms-3 mb-0">
                        ตั้งค่าการใช้งานกลุ่ม
                    </h1>
                </Card.Body>
            </Card>

            {/* Content */}
            <Card className="m-3">
                <Card.Body>
                    <Card.Title>
                        ค่าเริ่มต้นการแจ้งเรื่องใหม่
                    </Card.Title>
                    <div className="p-1">
                        <Form.Control
                            type="text"
                            placeholder="ชื่อหน่วยงาน"
                            value={org_name}
                            onChange={(e) => setOrgName(e.target.value)}
                            required
                            disabled
                        />
                    </div>
                    <InputGroup className="uuid-qr-input p-1">
                        <Form.Control
                            type="text"
                            placeholder="UUID-QR"
                            value={uuidQr}
                            onChange={(e) => setUuid(e.target.value)}
                            className={statusUUID(uuidValid)}
                            required
                        />
                        <InputGroup.Text className="scan-btn p-0 ps-2">
                            <Button variant="dark" onClick={handleShow}>
                                <BsQrCodeScan />
                            </Button>
                        </InputGroup.Text>
                    </InputGroup>
                    <Container className="mt-3">
                        <Row>
                            <Col xs={8} className="px-1 pe-2">
                                <Button
                                    variant="secondary"
                                    className="w-100"
                                    onClick={() => handleUuidCheck(uuidQr)}
                                >
                                    ตรวจสอบ UUID
                                </Button>
                            </Col>
                            <Col xs={4} className="px-1">
                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={() => console.log('Save')}
                                >
                                    บันทึก
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    {/* Offcanvas */}
                    <Offcanvas show={state} onHide={handleClose} placement="bottom" className="offcanvas-transform">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Scan QR Code</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <QrScanner onScan={handleScan} />
                        </Offcanvas.Body>
                    </Offcanvas>
                </Card.Body>
            </Card>

            <Card className="m-3">
                <Card.Body>
                    <Card.Title className="mb-3">
                        เกี่ยวกับการใช้งาน
                    </Card.Title>
                    {window.navigator.userAgent.includes("Line") &&
                        <div className="d-flex flex-row justify-content-between">
                            <p className="mb-0">Line</p>
                            <p className="mb-0">{window.navigator.userAgent.split('Line/')[1]}</p>
                        </div>
                    }
                    {window.navigator.userAgent.includes("Chrome") &&
                        <div className="d-flex flex-row justify-content-between">
                            <p className="mb-0">Chrome</p>
                            <p className="mb-0">{window.navigator.userAgent.split('Chrome/')[1].split(' ')[0]}</p>
                        </div>
                    }
                    {window.navigator.userAgent.includes("Safari") &&
                        <div className="d-flex flex-row justify-content-between">
                            <p className="mb-0">Safari</p>
                            <p className="mb-0">{window.navigator.userAgent.split('Safari/')[1].split(' ')[0]}</p>
                        </div>
                    }
                    {window.navigator.userAgent.includes("iPhone") &&
                        <div className="d-flex flex-row justify-content-between">
                            <p className="mb-0">iPhone</p>
                            <p className="mb-0">{window.navigator.userAgent.split('OS ')[1].split(' ')[0]}</p>
                        </div>
                    }
                    {window.navigator.userAgent.includes("Android") &&
                        <div className="d-flex flex-row justify-content-between">
                            <p className="mb-0">Android</p>
                            <p className="mb-0">{window.navigator.userAgent.split('Android ')[1].split(';')[0]}</p>
                        </div>
                    }
                </Card.Body>
            </Card>
        </>
    );
}