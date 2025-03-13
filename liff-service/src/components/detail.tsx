import React,
{
    ChangeEvent,
    useState,
    useEffect
} from "react";
import
{
    Card,
    Form,
    Button,
} from "react-bootstrap";
import axios from "axios";

const BaseUrl = import.meta.env.VITE_URL;
// const BaseUrl = "http://localhost:3002";
interface DetailProps {
    informType: (result: string) => void;
    description: (result: string) => void;
}

const Detail:
React.FC<DetailProps> = ({ informType, description }) => {
    const [type, setType] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [typeList, setTypeList] = useState<[{ id: string, category_name: string }]>([{ id: "", category_name: "" }]);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
        informType(e.target.value);
    };

    const handleDescChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value);
        description(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/backend/get/api/types`);
                setTypeList(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Card.Header className="text-center">
                <h5 className="mb-0">รายละเอียดเรื่องแจ้ง</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>เลือกประเภทเรื่องแจ้ง</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={handleTypeChange}
                        >
                            <option>ประเภทเรื่องแจ้ง</option>
                            {typeList.map((item) => {
                                return <option key={item.id} value={item.category_name}>{item.category_name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>รายละเอียด</Form.Label>
                        <Form.Control
                            as="textarea" rows={3}
                            placeholder="เพิ่มรายละเอียด"
                            onChange={handleDescChange}
                        />
                    </Form.Group>
                </Form>
            </Card.Body>
        </>
    );
};

export default Detail;