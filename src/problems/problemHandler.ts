import { ProblemService } from "../services/problemService";

export class ProblemHandler {
    constructor(private problem_id: string, private submitted_code: string) {}
    private problemService = new ProblemService();

    modifySubmittedCode = async () => {
        // console.log("In here");
        // console.log("Problem ID", this.problem_id);
        const problemTitle = await this.problemService.getProblemTitle(this.problem_id);
        switch (problemTitle) {
            case "Two Sum":
                return await this.modifyCode(new TwoSum());
            case "Remove Element":
                return await this.modifyCode(new RemoveElement());
            case "Contain Duplicate":
                return await this.modifyCode(new ContainDuplicate());
            case "Valid Anagram":
                return await this.modifyCode(new ValidAnagram());
            case "Group Anagram":
                return await this.modifyCode(new GroupAnagram());
            default:
                return this.submitted_code;
        }
    }

    private modifyCode = async (modifier: CodeModifier) => {
        return await modifier.modifySubmittedCode(this.submitted_code);
    }
}

interface CodeModifier {
    modifySubmittedCode(submittedCode: string): Promise<string>;
}

abstract class BaseModifier implements CodeModifier {
    abstract modifySubmittedCode(submittedCode: string): Promise<string>;

    protected generateModifiedCode(submittedCode: string, inputCode: string): string {
        if (!submittedCode) {
            throw new Error("Missing submitted code");
        }
        return `
            ${submittedCode}

            const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();
            ${inputCode}
        `;
    }
}

export class TwoSum extends BaseModifier {
    modifySubmittedCode = async (submittedCode: string) => {
        const inputCode = `
            const [nums, target] = JSON.parse(input);
            const result = twoSum(nums, target);
            console.log(result);
        `;
        return this.generateModifiedCode(submittedCode, inputCode);
    }
}

export class RemoveElement extends BaseModifier {
    modifySubmittedCode = async (submittedCode: string) => {
        const inputCode = `
            const [nums, val] = JSON.parse(input);
            const result = removeElement(nums, val);
            console.log(result);
        `;
        return this.generateModifiedCode(submittedCode, inputCode);
    }
}

export class ContainDuplicate extends BaseModifier {
    modifySubmittedCode = async (submittedCode: string) => {
        const inputCode = `
            const [nums] = JSON.parse(input);
            const result = containDuplicate(nums);
            console.log(result);
        `;
        return this.generateModifiedCode(submittedCode, inputCode);
    }
}

export class ValidAnagram extends BaseModifier {
    modifySubmittedCode = async (submittedCode: string) => {
        const inputCode = `
            const [s, t] = JSON.parse(input);
            const result = validAnagram(s, t);
            console.log(result);
        `;
        return this.generateModifiedCode(submittedCode, inputCode);
    }
}

export class GroupAnagram extends BaseModifier {
    modifySubmittedCode = async (submittedCode: string) => {
        const inputCode = `
            const [strs] = JSON.parse(input);
            const result = groupAnagram(strs);
            console.log(result);
        `;
        return this.generateModifiedCode(submittedCode, inputCode);
    }
}
