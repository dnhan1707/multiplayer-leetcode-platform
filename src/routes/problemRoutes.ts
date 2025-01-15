import { Router } from "express";
import { ProblemController } from "../controllers/problemController";
import { ProblemService } from "../services/problemService";

const router = Router();
const problemService = new ProblemService()
const problemController = new ProblemController(problemService);

router.get("/problem/random", problemController.randomProblem);
router.get("/problem/:id", problemController.getProblem);


export const problemRoutes = router;
