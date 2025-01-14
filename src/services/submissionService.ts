
export class SubmissionService {
    private judge_api = process.env.JUDGE_API;
    private judge_host = process.env.JUDGE_HOST;

    private validateEnvVariables() {
        if (!this.judge_api || !this.judge_host) {
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
}