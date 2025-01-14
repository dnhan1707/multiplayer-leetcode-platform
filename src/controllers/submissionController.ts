import { Request, Response } from "express";
import { SubmissionService } from "../services/submissionService";

export class SubmissionController {
    constructor(private submissionService: SubmissionService) {}

    createSubmission = async (req: Request, res: Response) => {
        try {
            const { submittedCode, languageId } = req.body;
            if (!submittedCode || !languageId) {
                return res.status(400).json({ message: "Invalid input" });
            }
            const result = await this.submissionService.createSubmission(submittedCode, languageId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "Failed to create a submission",
                error: error
            });
        }
    }

    getSubmission = async (req: Request, res: Response) => {
        try {
            const { tokenId } = req.params;
            if (!tokenId) {
                return res.status(400).json({ message: "Invalid token ID" });
            }
            const result = await this.submissionService.getSubmission(tokenId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "Failed to get submission",
                error: error
            });
        }
    }
}