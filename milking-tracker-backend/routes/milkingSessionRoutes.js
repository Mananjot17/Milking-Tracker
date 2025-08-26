import express from "express";

import {
  createSession,
  getSessions,
} from "../controllers/milkingSessionController.js";

const router = express.Router();

router.post("/", createSession);
router.get("/", getSessions);

export default router;
