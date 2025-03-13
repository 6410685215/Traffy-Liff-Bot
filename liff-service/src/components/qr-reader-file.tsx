import React,
{
    useEffect,
    useRef,
    useState
} from "react";
import
{
    Button
} from "react-bootstrap";
import { GoFileMedia } from "react-icons/go";
import { BarcodeDetector } from "barcode-detector/ponyfill";

import "./qr-reader-file.css";

const QrScannerFile:
React.FC<{ onScan: (result: string) => void }> = ({ onScan }) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (imgSrc) {
            setError(null);
        }
    }, [imgSrc]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setImgSrc(e.target?.result as string);
        };
        reader.onerror = () => {
            setError("Error reading file");
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (imgSrc) {
            detectCode(imgSrc);
        }
    }, [imgSrc]);

    const detectCode = async (imgSrc: string) => {
        if (!imgSrc) return;

        try {
            const img = new Image();
            img.src = imgSrc;
            img.onload = async () => {
                const qrDetector = new BarcodeDetector({ formats: ["qr_code"] });

                try {
                    const qrCodes = await qrDetector.detect(img);
                    if (qrCodes.length > 0) {
                        onScan(qrCodes[0].rawValue);
                    } else {
                        setError("No QR code found");
                    }
                } catch (err) {
                    setError("Error detecting QR code");
                }
            };
        } catch (err) {
            setError("Error loading image");
        }
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <Button
                onClick={() => fileInputRef.current?.click()}
                className="btn-scan-file"
                variant="link"
            >
                <GoFileMedia />
            </Button>
        </>
    );
};

export default QrScannerFile;