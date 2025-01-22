import { ProblemService } from "../services/problemService";

export class ProblemHandler {
    constructor(private problem_id: string, private submitted_code: string) {}
    private problemService = new ProblemService();

    modifySubmittedCode = async () => {
        if (await this.problemService.getProblemTitle(this.problem_id) == "Two Sum") {
            const twoSum = new TwoSum();
            return await twoSum.modifySubmittedCode(this.submitted_code);
        }
        return this.submitted_code;
    }
}

export class TwoSum {
    modifySubmittedCode = async (submittedCode: string) => {
        if (!submittedCode) {
            throw new Error("Missing submitted code");
        }

        const modifiedCode = `
            ${submittedCode}

            const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();
            const [nums, target] = JSON.parse(input);
            const result = twoSum(nums, target);
            console.log(result);
        `;
        return modifiedCode;
    }
}