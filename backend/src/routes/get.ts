import { Router } from "express";
import
{
    Types,
    Inform,
    Location,
    Status,
} from "../model";

const router = Router();

// Handle GET requests
router.get("/", (req, res) => {
    res.json({ status: "OK", message: "GET request to the homepage" });
});

router.get("/status/:groupID", async (req, res) => {
    const groupID = req.params.groupID;
    const informs = await Inform.getInformByGroupId(groupID);
    const status: any[] = [];
    for (const inform of informs) {
        const statuses = await Status.getStatusByInformId(inform.id);
        status.push(statuses);
    }

    const data = [];
    for (let i = 0; i < informs.length; i++) {
        data.push({
            ...informs[i],
            status: status[i]
        });
    }

    res.json({ status: "OK", data: data });
});

router.get("/inform/:id", async (req, res) => {
    const id = req.params.id;
    const inform = await Inform.getInformById(id);
    const status = await Status.getStatusByInformId(id);
    const location = await Location.getLocationByInformId(id);

    const data = {
        ...inform,
        status: status,
        location: location
    };

    res.json({ status: "OK", inform: data });
});

router.get("/api/types", async (req, res) => {
    const types = await Types.getAllCategories();
    res.json({ status: "OK", types: types });
});

export default router;