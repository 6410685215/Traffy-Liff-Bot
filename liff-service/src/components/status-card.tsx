import React,
{
    useRef,
    useState,
    useEffect,
} from "react";
import liff from "@line/liff";

import
{
    Button,
    ButtonGroup,
    Card
} from "react-bootstrap";
import CryptoJS from "crypto-js";

import "./status-card.css";
import
{
    Status,
    defaultBubble
} from "../utils";

interface StatusCardProps {
    inform: Inform;
}

interface Inform {
    id: string;
    timeStamp: string;
    type: string;
    org_name: string;
    location: LocationInform;
    status: Status[];
}

interface LocationInform {
    latitude: number;
    longitude: number;
    address: string;
}

const StatusCard:
React.FC<StatusCardProps> = ({ inform }) => {
    const [status, setStatus] = useState<string | null>(null);
    const [informId, setInformId] = useState<string | null>(null);
    const [image, setImage] = useState<string | undefined>(undefined);
    const [type, setType] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [orgName, setOrgName] = useState<string | null>(null);
    const [timeStamp, setTimeStamp] = useState<string | null>(null);
    const [idEncrypt, setIdEncrypt] = useState<string | null>(null);

    useEffect(() => {
        const status_first = inform.status[0];
        const status_last = inform.status[inform.status.length - 1];
        setInformId(inform.id);
        setOrgName(inform.org_name);
        setTimeStamp(new Date(inform.timeStamp).toLocaleString('th-TH',
            {
                timeZone: 'Asia/Bangkok',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }));
        setStatus(status_last.status);
        setDescription(status_first.description);
        setType(inform.type);
        setImage(status_first.photoUrl);

        const id = CryptoJS.HmacMD5(inform.id, import.meta.env.VITE_LIFF_ID).toString().slice(0, 6);
        setIdEncrypt(id);

        setIdEncrypt(`${new Date(inform.timeStamp).getFullYear()}-${id}-G`);
    }, []);

    function StatusColor(status: string | null): string {
        switch (status) {
            case "รอรับเรื่อง":
                return "text-waiting";
            case "กำลังดำเนินการ":
                return "text-processing";
            case "เสร็จสิ้น":
                return "text-success";
            default:
                return "";
        }
    }

    function StatusBorder(status: string | null): string {
        switch (status) {
            case "รอรับเรื่อง":
                return "border-waiting";
            case "กำลังดำเนินการ":
                return "border-processing";
            case "เสร็จสิ้น":
                return "border-success";
            default:
                return "";
        }
    }

    const handleShare = async () => {
        try {
            if (!idEncrypt) {
                throw new Error("idEncrypt is undefined");
            }
            if (!type) {
                throw new Error("type is undefined");
            }
            if (!orgName) {
                throw new Error("orgName is undefined");
            }
            if (!timeStamp) {
                throw new Error("timeStamp is undefined");
            }
            if (!informId) {
                throw new Error("informId is undefined");
            }

            const message = defaultBubble("แชร์สถานะเรื่องแจ้ง", idEncrypt, informId, inform.status, type, orgName, timeStamp, "https://cdn-icons-png.flaticon.com/512/929/929539.png");
            await liff.shareTargetPicker([message]);
            alert("แชร์สถานะเรื่องแจ้งเรียบร้อยแล้ว");
        } catch (error) {
            console.error(error);
        }
    };

    const handleShare2Group = async () => {
        try {
            await liff.sendMessages([
                {
                    type: "text",
                    text: `[updateStatus]-${informId}`
                }
            ]);
            alert("ขออัปเดตสถานะเรื่องแจ้งไปยังกลุ่มเรียบร้อยแล้ว");
        } catch (error) {
            console.error(error);
        }
    };

    const changePage = () => {
        window.location.href = `/ff/status/${informId}`;
    };

    return (
        <>
        <Card className={"status-card mb-3 " + StatusBorder(status)}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>รหัสแจ้ง: {idEncrypt}</Card.Title>
                <Card.Text>
                    รายละเอียด: {description} <br />
                    หน่วยงาน: {orgName}
                </Card.Text>
                <Card.Title className={StatusColor(status)}>{status}</Card.Title>
                <ButtonGroup>
                    <Button variant="primary" onClick={changePage}>ดูรายละเอียด</Button>
                    <Button variant="success" onClick={handleShare2Group}>แชร์ไปยังกลุ่ม</Button>
                    <Button variant="outline-secondary" onClick={handleShare}>แชร์</Button>
                </ButtonGroup>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{timeStamp}</small>
            </Card.Footer>
        </Card>
        </>
    );
}

export default StatusCard;
