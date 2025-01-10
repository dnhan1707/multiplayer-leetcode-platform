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
}