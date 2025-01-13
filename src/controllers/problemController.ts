import { Request, Response } from "express";
import { ProblemService } from "../services/problemServce";

export class ProblemController{
    constructor(private problemService: ProblemService){};

    randomProblem = async(req: Request, res: Response) => {
        try {
            const randomProblem = await this.problemService.getRandomProblem();
            res.status(200).json({
                message: "get random problem route",
                problem: randomProblem
            });
        } catch (error) {
            res.status(500).json({message: "Failed to get random problem"});
        }
    }

    getProblem = async(req: Request, res: Response) => {
        try {
            const problem = await this.problemService.getProblem(req.params.id)
            res.status(200).json({
                message: "got a problem by id",
                problem: problem
            })
        } catch (error) {
            res.status(500).json({message: "Failed to get a problem by Id"});
        }
    }

    compare = async(req: Request, res: Response) => {
        try {
            const returnedValue = req.body;
            const problemId = req.params.id;
            const compareResult = this.problemService.compareResult(problemId, returnedValue);
            res.status(200).json({
                message: "Compared",
                result: compareResult
            })
        } catch (error) {
            res.status(500).json({message: "Failed to compare"});
        }
    }
}