import { Request, Response } from "express";
import { SubmissionService } from "../services/submissionService";



export class SubmissionController{
    constructor(private submissionService: SubmissionService) {}

    createSubmission = async (req: Request, res: Response) => {
        try {
            const submittedCode = req.body.submittedCode;
            const languageId = req.body.languageId;
            const tokenId = this.submissionService.createSubmission(submittedCode, languageId);

            res.status(200).json(tokenId);
        } catch (error) {
            res.status(500).json({
                message: "Failed to create a submission"
            })
        }
    }

    getSubmission = async (req: Request, res: Response) => {
        try {
            const tokenId = req.params.tokenId;
            const result = this.submissionService.getSubmission(tokenId);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "Failed to create a submission"
            })
        }
    }
}
