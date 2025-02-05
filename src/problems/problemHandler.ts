import { ProblemService } from "../services/problemService";

export class ProblemHandler {
    constructor(private problem_id: string, private submitted_code: string) {}
    private problemService = new ProblemService();

    modifySubmittedCode = async () => {
        console.log("In here");
        console.log("Problem ID", this.problem_id);
        const problemTitle = await this.problemService.getProblemTitle(this.problem_id);
        switch (problemTitle) {
            case "Two Sum":
                const twoSum = new TwoSum();
                return await twoSum.modifySubmittedCode(this.submitted_code);
            case "Remove Element":
                const removeElement = new RemoveElement();
                return await removeElement.modifySubmittedCode(this.submitted_code);
            case "Contain Duplicate":
                const containDuplicate = new ContainDuplicate();
                return await containDuplicate.modifySubmittedCode(this.submitted_code);
            default:
                return this.submitted_code;
        }
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


export class RemoveElement {
    modifySubmittedCode = async (submittedCode: string) => {
        if (!submittedCode) {
            throw new Error("Missing submitted code");
        }
        const modifiedCode = `
            ${submittedCode}

            const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();
            const [nums, val] = JSON.parse(input);
            const result = removeElement(nums, val);
            console.log(result);
        `;
        return modifiedCode;
    }
}

export class ContainDuplicate {
    modifySubmittedCode = async (submittedCode: string) => {
        if (!submittedCode) {
            throw new Error("Missing submitted code");
        }
        const modifiedCode = `
            ${submittedCode}

            const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();
            const [nums] = JSON.parse(input);
            const result = containDuplicate(nums);
            console.log(result);
        `;
        return modifiedCode;
    }
}
