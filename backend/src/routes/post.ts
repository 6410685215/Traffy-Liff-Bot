import { Router } from "express";
import multer from "multer";

import * as api from "../api";
import { Inform, Status, Location, Groups } from "../model";
import { uploadSupabase, FileUpload } from "../utils/FileUpload";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Handle POST requests
router.post("/", (req, res) => {
    // Get the data from the request body
    const { body, file } = req;
    console.log("Received body:", JSON.stringify(body, null, 2)); // Log the other form data
    console.log("Received file:", file);  // Log the uploaded file

    // Respond to the client
    res.json({ status: "OK", message: "Data received!" });
});

router.post("/api/inform", upload.single("image"), async (req, res) => {
    const { body, file } = req;
    console.log("Received body:", body);
    console.log("Received file:", file);

    const fileUpload = new FileUpload(uploadSupabase);

    const {
        accessToken,
        groupID,
        OAuserID,
        // uuid_qr,
        address,
        latitude,
        longitude,
        inform_type,
        description,
        org_name,
        org_id,
    } = body;

    const imageUrl = file ? await fileUpload.upload(file) : null;
    // const [org_name, org_id] = await api.getOrg(uuid_qr);
    const user = await api.getUser(accessToken);
    const user_id = user.userId;
    const user_name = user.displayName;
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    const data = await Inform.addInform({
        type: inform_type,
        user_id,
        user_name,
        group_id: groupID,
        oa_id: OAuserID,
        org_name,
        org_id,
    });
    const status = await Status.addStatus({
        status: "รอรับเรื่อง",
        description,
        photoUrl: imageUrl,
        inform: { connect: { id: data.id } }
    });
    const location = await Location.addLocation({
        address,
        latitude: lat,
        longitude: lon,
        inform: { connect: { id: data.id } }
    });

    res.json({
        status: "200",
        id: data.id,
    });
});

router.post("/api/save-default", async (req, res) => {
    const { body } = req;
    console.log("Received body:", body);

    const {
        uuid_qr,
        org_name,
        org_id,
        group_id
    } = body;

    const group = await Groups.saveDefault({
        id: group_id,
        uuid_qr,
        org_name,
        org_id,
    });

    res.json({
        status: "200",
        id: group.id,
    });
});

export default router;
