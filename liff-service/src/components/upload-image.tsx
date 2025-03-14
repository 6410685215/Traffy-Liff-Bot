import React,
{
    useRef,
    useState,
    ChangeEvent
} from "react";

import
{
    Button,
    Form,
    Card
} from "react-bootstrap";
import { GoFileMedia } from "react-icons/go";
import imageCompression from 'browser-image-compression';

import "./upload-image.css";

interface UploadImageProps {
    image: (result: File | null) => void;
}

const UploadImage:
React.FC<UploadImageProps> = ({ image }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            handleCompressImage(file).then(compressedFile => {
                setImageFile(compressedFile);
                image(compressedFile);
            });
            image(file);
        }
    };

    const handleUploadClick = () => {
        fileInput.current?.click();
    };

    const handleCompressImage = async (file: File): Promise<File> => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1280,
            useWebWorker: true
        };
        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error(error);
            return file;
        }
    }

    return (
        <>
            <Card.Header className="text-center">
                <h5 className="mb-0">อัพโหลดรูปภาพ</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>อัพโหลดรูปภาพ</Form.Label>
                        <div className="d-flex justify-content-center">
                            <div className="image-preview mb-3"
                                onClick={handleUploadClick}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="preview-img"/>
                                ) : (
                                    <div className="d-flex flex-column align-items-center">
                                        <GoFileMedia size={48} />
                                        <p>กรุณาอัพโหลดรูปภาพ</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInput}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleUploadClick}>
                                อัพโหลดรูปภาพ
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Card.Body>
        </>
    );

};

export default UploadImage;