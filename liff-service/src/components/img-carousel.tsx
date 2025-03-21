import React from "react";

import {
    Card,
    Carousel,
} from "react-bootstrap";

import "./img-carousel.css";

interface ImgCarouselProps {
    items: status[];
}

interface status {
    photoUrl: string;
    status: string;
}

function statusBorders(status: string) {
    switch (status) {
        case "รอรับเรื่อง":
            return "border-b-waiting";
        case "กำลังดำเนินการ":
            return "border-b-processing";
        case "เสร็จสิ้น":
            return "border-b-success";
        default:
            return "";
    }
}

const ImgCarousel:
React.FC<ImgCarouselProps> = ({ items }) => {
    const status = items[items.length - 1].status;

    return (
        <Carousel touch={true} className="img-carousel-container">
            {items.map((image, idx) => ( image.photoUrl &&
                <Carousel.Item key={idx} className="img-carousel-item">
                    <Card className={"status-card " + statusBorders(status)}>
                        <Card.Img src={image.photoUrl} />
                    </Card>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ImgCarousel;