import { Testcase } from "../models/testcase";

export class TestcaseService{
    async getTestcaseByProblemId(problemId: string) {
        const testcases = await Testcase.findAll({
            where: {problem_id: problemId},
        })
        return testcases.map(testcase => testcase.input_data);
    }


    async getExpectedValueProblemId(problemId: string) {
        const testcases = await Testcase.findAll({
            where: {problem_id: problemId},
        })
        return testcases.map(testcase => testcase.expected_output);
    }
}