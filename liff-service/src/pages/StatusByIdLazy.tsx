import {
    Nav,
    Tab,
    Card,
    Image,
    Placeholder
} from "react-bootstrap";

import folderCheckIcon from "/liff-icons/folder_check.svg";

export default function StatusByIdLazy() {

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

            <div className="m-3">
                <Image className="rounded w-100" src="https://placehold.co/300x200?text=Image" fluid />
            </div>

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
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={5} /> <Placeholder xs={6} />
                                    <Placeholder xs={7} /> <Placeholder xs={4} />
                                    <Placeholder xs={3} /> <Placeholder xs={8} />
                                </Placeholder>
                            </Tab.Pane>
                            <Tab.Pane eventKey="status" transition={true}>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={5} /> <Placeholder xs={6} />
                                    <Placeholder xs={3} /> <Placeholder xs={8} />
                                    <Placeholder xs={7} /> <Placeholder xs={4} />
                                </Placeholder>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>

            {/* report */}
            <Placeholder as={Card} className="m-3" animation="glow">
                <Placeholder as={Card.Body} animation="glow">
                    <div style={{height: "300px"}}></div>
                </Placeholder>
            </Placeholder>
        </>
    );
}