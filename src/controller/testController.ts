import { Router } from "express";

const router = Router();

// GET /test/list
router.get("/list", (req, res) => {
    console.log("/list");
    res.json({msg: "test"});
})

export default router;