import { Request, Response } from "express";
import { ProblemService } from "../services/problemService";

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

    getProblemByTitle = async(req: Request, res: Response) => {
        try {
            const problem = await this.problemService.getProblemByTitle(req.params.title)
            res.status(200).json({
                message: "got a problem by title",
                problem: problem
            })
        } catch (error) {
            res.status(500).json({message: "Failed to get a problem by title"});
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

    getTestcaseByProblemId = async(req: Request, res: Response) => {
        try {
            const testcases = await this.problemService.getTestCaseById(req.params.id);
            res.status(200).json({
                testcase: testcases
            })
        } catch (error) {
            res.status(500).json({message: "Failed to get a problem testcases by problem Id"});
        }
    }

}