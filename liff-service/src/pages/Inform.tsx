import
{
    useEffect,
    useState
} from "react";
import liff from "@line/liff";
import axios from "axios";

import
{
    QrAddress,
    Detail,
    UploadImage
} from "../components";
import
{
    Card,
    Button,
    ButtonGroup
} from "react-bootstrap";
import
{
    FlexBubbleBuilder,
    defaultBubble,
    Status,
    CFlexMessage
} from "../utils";

import "./Inform.css";

import megaPhoneIcon from "/liff-icons/megaphone.svg";

const BaseUrl = import.meta.env.VITE_URL;

interface ResponsePostInform {
    id: string;
    status: Status[];
    type: string;
    orgName: string;
    timeStamp: string;
}

export default function Inform() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [groupID, setGroupID] = useState<string | null>(null);
    const [OAuserID, setOAuserID] = useState<string | null>(null);
    const [uuid_qr, setUUID_QR] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    // useEffect(() => {
    //     const initLoading = document.getElementById("init-loading");
    //     initLoading?.remove();
    // }, []);
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
        const formData = new FormData();
        formData.append("accessToken", accessToken || "");
        formData.append("groupID", groupID || "");
        formData.append("OAuserID", OAuserID || "");
        formData.append("uuid_qr", uuid_qr);
        formData.append("address", address);
        formData.append("latitude", location?.latitude.toString() || "");
        formData.append("longitude", location?.longitude.toString() || "");
        formData.append("inform_type", type);
        formData.append("description", description);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const response = await axios.post<{data: ResponsePostInform}>(`${BaseUrl}/backend/post/api/inform`, formData);
            const { id, status, type, orgName, timeStamp } = response.data.data;
            const bubble = defaultBubble("ยืนยันการแจ้งเรื่อง", id, status, type, orgName, timeStamp, "https://cdn-icons-png.flaticon.com/512/18604/18604789.png");
            const message: CFlexMessage[] = [bubble];
            try {
                await liff.sendMessages(message);
            } catch (error) {
                throw  new Error(JSON.stringify(message, null, 2));
            }
            liff.closeWindow();
        } catch (error) {
            alert(error);
        }
    }

    const handleCancel = () => {
        liff.closeWindow();
    }

    return (
        <>
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
        </>
    );
}