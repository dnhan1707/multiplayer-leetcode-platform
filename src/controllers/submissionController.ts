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

    createBatchSubmission = async (req: Request, res: Response) => {
        try {
            const { submittedCode, languageId, problemId } = req.body;
            console.log("submittedCode", submittedCode);
            if (!submittedCode || !languageId || !problemId) {
                return res.status(400).json({ 
                    message: "Missing required fields", 
                    missingFields: {
                        submittedCode: !submittedCode,
                        languageId: !languageId,
                        problemId: !problemId
                    }
                });
            }

            const result = await this.submissionService.batchSubmission(submittedCode, languageId, problemId);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "Failed to create batch submission",
                error: error
            });
        }
    }

    getBatchSubmission = async (req: Request, res: Response) => {
        try {
            const { tokenIds } = req.body;
            console.log("getBatchSubmission", tokenIds);
            const result = await this.submissionService.getBatchSubmission(tokenIds)
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "Failed to get batch submission",
                error: error
            });
        }
    }
    
}