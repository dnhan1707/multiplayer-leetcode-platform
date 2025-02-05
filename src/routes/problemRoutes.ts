import { Router } from "express";
import { ProblemController } from "../controllers/problemController";
import { ProblemService } from "../services/problemService";

const router = Router();
const problemService = new ProblemService()
const problemController = new ProblemController(problemService);

// router.get("/problem/random", problemController.randomProblem);
router.get("/problem/:title", problemController.getProblemByTitle);
// router.get("/problem/:id", problemController.getProblem);
router.get("/problem/:id/testcase", problemController.getTestcaseByProblemId);

export const problemRoutes = router;
