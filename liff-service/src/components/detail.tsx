import React,
{
    ChangeEvent,
    useState,
    useEffect
} from "react";
import
{
    Card,
    Form
} from "react-bootstrap";
import axios from "axios";

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
                const response = await axios.get('/backend/get/api/types');
                setTypeList(response.data.types);
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
                    <Form.Group>
                        <Form.Label>เลือกประเภทเรื่องแจ้ง</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={handleTypeChange}
                            required
                        >
                            <option label="ประเภทเรื่องแจ้ง"></option>
                            {typeList.map((item) => {
                                return <option key={item.id} value={item.category_name}>{item.category_name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>รายละเอียด</Form.Label>
                        <Form.Control
                            required
                            as="textarea" rows={3}
                            placeholder="เพิ่มรายละเอียด"
                            onChange={handleDescChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            กรุณากรอกรายละเอียด
                        </Form.Control.Feedback>
                    </Form.Group>
            </Card.Body>
        </>
    );
};

export default Detail;