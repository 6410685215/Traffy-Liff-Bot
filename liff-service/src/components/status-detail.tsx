import React from 'react';
import {
    Col,
    Row,
    Container
} from 'react-bootstrap';
import { GrStatusCriticalSmall } from "react-icons/gr";

import "./status-detail.css";

const StatusDetail:
React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case "รอรับเรื่อง":
            return (
                <>
                    <Container>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--color-wait)" size={"1.5rem"} />
                                <div className="line"></div>
                            </Col>
                            <Col xs={10}>
                                <p className="wait">รอดำเนินการ</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--bs-gray-300)" size={"1.5rem"} />
                                <div className="line"></div>
                            </Col>
                            <Col xs={10}>
                                <p>กำลังดำเนินการ</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--bs-gray-300)" size={"1.5rem"} />
                            </Col>
                            <Col xs={10}>
                                <p>ดำเนินการเสร็จสิ้น</p>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        case "เสร็จสิ้น":
            return (
                <>
                    <Container>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--color-wait)" size={"1.5rem"} />
                                <div className="line"></div>
                            </Col>
                            <Col xs={10}>
                                <p className="wait">รอรับเรื่อง</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--color-process)" size={"1.5rem"} />
                                <div className="line"></div>
                            </Col>
                            <Col xs={10}>
                                <p className="process">กำลังดำเนินการ</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--color-success)" size={"1.5rem"} />
                            </Col>
                            <Col xs={10}>
                                <p className="success">เสร็จสิ้น</p>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        default:
            return (
                <>
                    <Container>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--color-wait)" size={"1.5rem"} />
                                <div className="line"></div>
                            </Col>
                            <Col xs={10}>
                                <p className="wait">รอดำเนินการ</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--color-process)" size={"1.5rem"} />
                                <div className="line"></div>
                            </Col>
                            <Col xs={10}>
                                <p className="process">กำลังดำเนินการ</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} className="status-line">
                                <GrStatusCriticalSmall color="var(--bs-gray-300)" size={"1.5rem"} />
                            </Col>
                            <Col xs={10}>
                                <p>ดำเนินการเสร็จสิ้น</p>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
    }
};

export default StatusDetail;