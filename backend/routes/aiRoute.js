import express from "express";
import {
  analyzePatientCase,
  downloadTriageReportPdf,
  getTriageReport,
  getUserReportHistory,
} from "../controllers/aiController.js";
import authUser from "../middleware/authUser.js";
import optionalAuthUser from "../middleware/optionalAuthUser.js";

const aiRouter = express.Router();

aiRouter.post("/analyze", optionalAuthUser, analyzePatientCase);
aiRouter.get("/report/:reportId", getTriageReport);
aiRouter.get("/report/:reportId/pdf", downloadTriageReportPdf);
aiRouter.get("/my-reports", authUser, getUserReportHistory);

export default aiRouter;
