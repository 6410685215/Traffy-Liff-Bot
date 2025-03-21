import {
    useState,
    useEffect,
} from "react";
import axios from "axios";

import {
    Nav,
    Tab,
    Card,
} from "react-bootstrap";

import { StatusCard } from "../components";
import StatusLazy from "./StatusLazy";

import folderCheckIcon from "/liff-icons/folder_check.svg";
import "./Status.css";

// const BaseUrl = import.meta.env.VITE_URL;
// const BaseUrl = "http://localhost:3002";
// const BaseUrl = "http://10.221.43.76:3002";

export default function Status() {
    const [inform, setInform] = useState<any>(null);
    const [informSuccess, setInformSuccess] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const groupId = params.get("groupId");
                // const response = await axios.get(`${BaseUrl}/backend/get/status/${groupId}`);
                const response = await axios.get(`/backend/get/status/${groupId}`);
                const informData = response.data.data;
                const informSuccessData = informData.filter((inform: any) => inform.status[inform.status.length - 1].status === "เสร็จสิ้น");
                const informProsessData = informData.filter((inform: any) => inform.status[inform.status.length - 1].status !== "เสร็จสิ้น");

                setInform(informProsessData);
                setInformSuccess(informSuccessData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        init();
    }, []);

    if (isLoading) {
        return <StatusLazy />;
    }

    return (
        <>
            {/* Header */}
            <Card className="head-form m-3">
                <Card.Body className="d-flex align-items-center">
                    <img src={folderCheckIcon} alt="Icon folder check" />
                    <h1 className="ms-3 mb-0">
                        สถานะการแจ้งเรื่อง
                    </h1>
                </Card.Body>
            </Card>

            <Tab.Container id="status-tabs" defaultActiveKey="first">
                {/* Status */}
                <div className="status-container ps-3 pe-3">
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            {inform ? inform.map((inform: any) => (
                                <StatusCard inform={inform} key={inform.id} />
                            )) : null}
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {informSuccess ? informSuccess.map((inform: any) => (
                                <StatusCard inform={inform} key={inform.id} />
                            )) : null}
                        </Tab.Pane>
                    </Tab.Content>
                </div>

                {/* Tabs Nav */}
                <div className="status-tabs-nav pt-2 pb-2">
                    <Nav justify variant="underline" defaultActiveKey="first" className="p-1">
                        <Nav.Item>
                            <Nav.Link eventKey="first">รอการตรวจสอบ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">เสร็จสิ้น</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </Tab.Container>
        </>
    );
}