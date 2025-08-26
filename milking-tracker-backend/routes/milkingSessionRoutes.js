import express from "express";

import {
  createSession,
  getSessions,
} from "../controllers/milkingSessionController.js";

const router = express.Router();

router.post("/sessions", createSession);
router.get("/sessions", getSessions);

export default router;
