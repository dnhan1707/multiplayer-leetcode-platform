import { Request, Response } from "express"
import { SubmissionService } from "../services/submissionService";



export class SubmissionController{
    constructor(private submissionService: SubmissionService){}
    createSubmission = async (req: Request, res: Response) => {
        const source_code = req.body.source_code;
        const language_id = req.body.languageId;
        this.submissionService.createSubmission(source_code, language_id)
    }

    getSubmission = async (req: Request, res: Response) => {
        const tokenId = req.params.tokenId;
        this.submissionService.getSubmission(tokenId);
    }
}