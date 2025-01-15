import { TestcaseService } from "./testcaseService";
import dotenv from 'dotenv';
dotenv.config();

export class SubmissionService {
    private judge_api = process.env.JUDGE_API;
    private judge_host = process.env.JUDGE_HOST;

    private validateEnvVariables() {
        if (!this.judge_api || !this.judge_host) {
            console.log("In here")

            throw new Error("Judge0 API credentials are not set");
        }

    }

    private async fetchFromJudge0(url: string, options: RequestInit) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error: ${response.statusText} - ${errorDetails}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw new Error("Failed to communicate with Judge0 API");
        }
    }

    async createSubmission(submittedCode: string, languageId: number) {
        console.log("In here")
        this.validateEnvVariables();

        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': this.judge_api || '', 
                'x-rapidapi-host': this.judge_host || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: btoa(submittedCode)
            })
        };

        return this.fetchFromJudge0(url, options);
    }

    async getSubmission(tokenId: string) {
        this.validateEnvVariables();

        const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.judge_api || '',
                'x-rapidapi-host': this.judge_host || '',
            }
        };

        return this.fetchFromJudge0(url, options);
    }



    async prepareBatchSubmission(submittedCode: string, languageId: number, problemId: string) {
        //Testcase should be retrived from problemId
        const testcaseService = new TestcaseService();
        const testcases = await testcaseService.getTestcaseByProblemId(problemId);
        // console.log(testcases);
        return testcases.map((testcase: string) => ({
            language_id: languageId,
            source_code: btoa(submittedCode),
            stdin: btoa(testcase)
        }));
    }
    
    async batchSubmission(submittedCode: string, languageId: number, problemId: string) {
        this.validateEnvVariables();

        const submissions = await this.prepareBatchSubmission(submittedCode, languageId, problemId);
        const url = `https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true`;
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': this.judge_api || '',
                'x-rapidapi-host': this.judge_host || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ submissions: submissions }) // Use the correct key name
        };
    
        try {
            const response = await this.fetchFromJudge0(url, options);
            console.log("Batch Submission Result:", response);
            return response;
        } catch (error) {
            console.error("Batch Submission Error:", error);
            throw new Error("Failed to submit batch submissions to Judge0");
        }
    }
    
    async getBatchSubmission(tokenId: string) {
        this.validateEnvVariables();

        const url = `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokenId}&base64_encoded=true&fields=*`;
        const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': this.judge_api || '',
            'x-rapidapi-host': this.judge_host || '',
        }
        };

        try {
            const response = await this.fetchFromJudge0(url, options);
            return response;
        } catch (error) {
            console.error(error);
}
    }
}