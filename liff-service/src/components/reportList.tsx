import { GrStatusCriticalSmall } from "react-icons/gr";
import {
    Container,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import React from "react";
import "./reportList.css";

interface Status {
    timeStamp: string;
    status: string;
    description?: string;
    photoUrl?: string;
}

function colorStatus(status: string) {
    switch (status) {
        case "รอรับเรื่อง":
            return "var(--color-wait)";
        case "เสร็จสิ้น":
            return "var(--color-success)";
        default:
            return "var(--color-process)";
    }
}

const ReportList:
React.FC<Status[]> = (status) => {
    console.log(status);
    const arrStatus = Object.values(status);
    console.log(arrStatus);
    return (
        <>
            <Card.Body>
                <Card.Title>
                    <h3>รายงานสถานะ</h3>
                </Card.Title>

                <Container className="report-list">
                    {
                        arrStatus.map((status, idx) => {
                            const time = new Date(status.timeStamp).toLocaleTimeString('th-TH');
                            const date = new Date(status.timeStamp).toLocaleDateString('th-TH');

                            return (
                            <Row key={idx}>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color={colorStatus(status.status)} size={"1.5rem"} />
                                { (idx !== arrStatus.length - 1) && <div className="line"></div> }
                            </Col>
                            <Col xs={10}>
                                <h5 style={{color: `${colorStatus(status.status)}`}}>{status.status}</h5>
                                <div className="mb-3">
                                    <p>วันที่ {date}</p>
                                    <p>เวลา {time} น.</p>
                                    { status.photoUrl && <Card.Img src={status.photoUrl} /> }
                                    { status.description && <p>รายละเอียด: {status.description}</p> }
                                </div>
                            </Col>
                        </Row>
                        )})
                    }
                </Container>
            </Card.Body>
        </>
    );
}
export default ReportList;