import { Router } from "express";
import
{
    Types,
    Inform,
    Location,
    Status,
    Groups
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
    const location = await Location.getLocationById(id);

    if (!inform) {
        res.json({ status: "Error", message: "Inform not found" });
        return;
    }

    const data = {
        id: inform.id,
        type: inform.type,
        timeStamp: inform.timeStamp,
        org_name: inform.org_name,
        status: status,
        location: location
    };

    res.json({ status: "OK", inform: data });
});

router.get("/api/types", async (req, res) => {
    const types = await Types.getAllCategories();
    res.json({ status: "OK", types: types });
});

router.get("/api/default/:id", async (req, res) => {
    const group = await Groups.getDefaultById(req.params.id);
    if (!group) {
        res.json({ status: "Error", message: "Group not found" });
        return;
    }
    res.json({
        status: "OK",
        default: {
            uuid_qr: group.uuid_qr,
            org_name: group.org_name,
            org_id: group.org_id,
            group_id: group.id
        }
    });
});
export default router;