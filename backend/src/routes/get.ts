import { Router } from "express";
import { Types } from "../model";

const router = Router();

// Handle GET requests
router.get("/", (req, res) => {
    res.json({ status: "OK", message: "GET request to the homepage" });
});

router.get("/:groupID", (req, res) => {
    const { groupID } = req.params;
    res.json({ status: "OK", data: "xxx" });
});


router.get("/api/types", async (req, res) => {
    const types = await Types.getAllCategories();
    res.json({ status: "OK", data: types });
});

export default router;