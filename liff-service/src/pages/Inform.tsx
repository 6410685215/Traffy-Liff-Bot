import {
    useState,
    useEffect,
} from "react";
import liff from "@line/liff";
import axios from "axios";

import {
    Detail,
    QrAddress,
    UploadImage,
} from "../components";
import {
    Card,
    Form,
    Modal,
    Button,
    Spinner,
    ButtonGroup,
} from "react-bootstrap";

import "./Inform.css";

import megaPhoneIcon from "/liff-icons/megaphone.svg";

const BaseUrl = import.meta.env.VITE_URL;

export default function Inform() {
    const [sending, setSending] = useState<boolean>(false);
    const [validated, setValidated] = useState(false);

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [groupID, setGroupID] = useState<string | null>(null);
    const [OAuserID, setOAuserID] = useState<string | null>(null);
    const [uuid_qr, setUUID_QR] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const initProfile = () => {
            try {
                const _accessToken = liff.getAccessToken();
                setAccessToken(_accessToken);
                setGroupID(getGroupID());
                setOAuserID(getOAuserID());
            } catch (e) {
                console.error(e);
            }
        };
        initProfile();
    }, []);

    const getGroupID = (): string | null => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('groupId');
    };

    const getOAuserID = (): string | null => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('botUserId');
    };

    const handleInformSubmit = async () => {

        setValidated(true);
        const formData = new FormData();
        if (!accessToken ||
            !groupID     ||
            !OAuserID) {
            alert("Init failed");
            return;
        }
        if (!uuid_qr ||
            !type    ||
            !description) {
            alert("Please fill in all required fields");
            return;
        }
        if (!address || !location) {
            alert("Please share location");
            return;
        }
        if (!imageFile) {
            alert("Please upload image");
            return;
        }

        formData.append("accessToken", accessToken);
        formData.append("groupID", groupID);
        formData.append("OAuserID", OAuserID);
        formData.append("uuid_qr", uuid_qr);
        formData.append("address", address);
        formData.append("latitude", location?.latitude.toString());
        formData.append("longitude", location?.longitude.toString());
        formData.append("inform_type", type);
        formData.append("description", description);
        formData.append("image", imageFile);

        setSending(true);
        alert("Sending...");
        try {
            const response = await axios.post<{ id: string }>('/backend/post/api/inform', formData);
            await liff.sendMessages([
                {
                    type: "text",
                    text: `[verifyInform]-${response.data.id}`
                }
            ]);
            setSending(false);
            liff.closeWindow();
        } catch (error) {
            alert(error);
            setSending(false);
        }
    }

    const handleCancel = () => {
        liff.closeWindow();
    }

    return (
        <>
            {/* Loading */}
            <Modal show={sending} backdrop="static" keyboard={false} centered>
                <Modal.Body className="d-flex justify-content-center align-items-center p-5">
                    <Spinner animation="border" variant="primary" />
                </Modal.Body>
            </Modal>

            {/* Header */}
            <Card className="head-form m-3">
                <Card.Body className="d-flex align-items-center">
                    <img src={megaPhoneIcon} alt="Icon megaphone" />
                    <h1 className="ms-3 mb-0">
                        แจ้งเรื่องใหม่
                    </h1>
                </Card.Body>
            </Card>

            {/* scan Code & Address */}
            <Form noValidate validated={validated}>
            <Card className="qr-address-container m-3">
                <QrAddress
                    uuid_qr={setUUID_QR}
                    address={setAddress}
                    loc={setLocation}
                />
            </Card>

            {/* Detail */}
            <Card className="detail-container m-3">
                <Detail
                    informType={setType}
                    description={setDescription}
                />
            </Card>

            {/* Upload Image */}
            <Card className="upload-image-container m-3">
                <UploadImage
                    image={setImageFile}
                />
            </Card>

            {/* Submit Button */}
            <ButtonGroup className="d-flex justify-content-center m-3 submit-btn-group">
                <Button variant="light" size="lg" className="cancel-btn" onClick={handleCancel}>
                    ยกเลิก
                </Button>
                <Button variant="success" size="lg" className="submit-btn" onClick={handleInformSubmit}>
                    ส่งเรื่อง
                </Button>
            </ButtonGroup>
            </Form>
        </>
    );
}