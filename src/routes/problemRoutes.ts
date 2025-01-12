import { Router } from "express";
import { ProblemController } from "../controllers/problemController";
import { ProblemService } from "../services/problemServce";

const router = Router();
const problemService = new ProblemService()
const problemController = new ProblemController(problemService);

router.get("/problem/random", problemController.randomProblem);
router.get("/problem/:id", problemController.getProblem);
router.post("/problem/:id/compare", problemController.compare);

export const problemRoutes = router;
