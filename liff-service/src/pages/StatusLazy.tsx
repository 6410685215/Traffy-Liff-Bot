import {
    Nav,
    Tab,
    Card,
    Placeholder,
} from "react-bootstrap";

import folderCheckIcon from "/liff-icons/folder_check.svg";
import "./Status.css";

export default function StatusLazy() {

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
                            <Card className={"status-card mb-3"}>
                                <Card.Img variant="top" src='https://placehold.co/300x200?text=image' />
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <br />
                                        <Placeholder xs={5} /> <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={4} />
                                </Card.Body>
                                <Card.Footer>
                                    <Placeholder as="small" animation="glow">
                                        <Placeholder xs={4} />
                                    </Placeholder>
                                </Card.Footer>
                            </Card>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Card className={"status-card mb-3"}>
                                <Card.Img variant="top" src='https://placehold.co/300x200?text=image' />
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <br />
                                        <Placeholder xs={5} /> <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={4} />
                                </Card.Body>
                                <Card.Footer>
                                    <Placeholder as="small" animation="glow">
                                        <Placeholder xs={4} />
                                    </Placeholder>
                                </Card.Footer>
                            </Card>
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