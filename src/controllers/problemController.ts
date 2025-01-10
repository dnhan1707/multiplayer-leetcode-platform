import { Request, Response } from "express";

export class ProblemController{
    randomProblem = async(req: Request, res: Response) => {
        try {
            res.status(200).json({message: "get random problem route"});
        } catch (error) {
            res.status(500).json({message: "Failed to get random problem"});
        }
    }
}