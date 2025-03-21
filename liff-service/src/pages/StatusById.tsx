import {
    Nav,
    Tab,
    Card,
} from "react-bootstrap";
import {
    useEffect,
    useState,
} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
    ImgCarousel,
    StatusDetail,
    ReportList,
} from "../components";

import {
    generateId,
} from "../utils";

import StatusByIdLazy from "./StatusByIdLazy";

import { FaLocationDot } from "react-icons/fa6";
import folderCheckIcon from "/liff-icons/folder_check.svg";
import "./Status.css";

interface DetailProps {
    id: string;
    type: string;
    timeStamp: string;
    org_name: string;
    location: Location;
    status: Status[];
}

interface Location {
    latitude : number;
    longitude: number;
    address: string;
}

interface Status {
    timeStamp: string;
    status: string;
    description?: string;
    photoUrl?: string;
}
const Detail:
React.FC<DetailProps> = (inform) => {

    const date = new Date(inform.timeStamp);
    const dateStr = `${date.toLocaleDateString('th-TH' , { year: 'numeric', month: 'long', day: 'numeric' })} เวลา ${date.toLocaleTimeString('th-TH')}`;
    const locationStr = `${inform.location.address} (${inform.location.latitude}, ${inform.location.longitude})`;
    return (
        <>
            <Card.Title>
                <h3>{generateId(inform.timeStamp, inform.id)}</h3>
            </Card.Title>
            <Card.Text as={"div"}>
                <p><b>ประเภท:</b> {inform.type}</p>
                <p>{dateStr}</p>
                <p>
                    <FaLocationDot color="var(--color-wait)" />&emsp;
                    {locationStr}
                </p>
                <p>
                    <b>หน่วยงาน:</b>&emsp;
                    {inform.org_name}
                </p>
                <p>
                    <b>รายละเอียด:</b>&emsp;
                    {inform.status[0].description}
                </p>
            </Card.Text>
        </>
    );
}

// const BaseUrl = "http://10.221.43.76:3002";
export default function StatusById() {

    const [informData, setInform] = useState<any>(null);
    const [status, setStatus] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const init = async () => {
            try {
                // const response = await axios.get(`${BaseUrl}/backend/get/inform/${id}`);
                const response = await axios.get(`/backend/get/inform/${id}`);
                const informData = response.data.inform;
                setInform(informData);
                setStatus(informData.status);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        init();
    }, []);

    if (isLoading) {
        return <StatusByIdLazy />;
    }

    return (
        <>
            {/* Header */}
            <Card className="head-form m-3">
                <Card.Body className="d-flex align-items-center">
                    <img src={folderCheckIcon} alt="Icon folder check" />
                    <h1 className="ms-3 mb-0">
                        รายละเอียดเรื่องแจ้ง
                    </h1>
                </Card.Body>
            </Card>

            <ImgCarousel items={status} />

            {/* detail */}
            <Card className="m-3">
                <Card.Body>
                    <Tab.Container defaultActiveKey="detail">
                        <Nav variant="pills" className="mb-3">
                            <Nav.Item className="me-1">
                                <Nav.Link eventKey="detail">รายละเอียด</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="status">สถานะ</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="detail" transition={true}>
                                <Detail {...informData} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="status" transition={true}>
                                <StatusDetail status={status[status.length - 1].status} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>

            {/* report */}
            <Card className="m-3">
                <ReportList {...status} />
            </Card>
        </>
    );
}