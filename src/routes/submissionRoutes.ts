import { Router } from "express";
import { SubmissionController } from "../controllers/submissionController";
import { SubmissionService } from "../services/submissionService";

const router = Router();
const submissionService = new SubmissionService();
const submissionController = new SubmissionController(submissionService);

router.post("/submission", submissionController.createSubmission);
router.get("/submission/:tokenId", submissionController.getSubmission);


export const submissionRoutes = router;
