import { Problem } from "../models/problem";
import { Testcase } from "../models/testcase";

export class ProblemService {
    async getRandomProblem() {
        const problemCount = await Problem.count();
        const randomIndex = Math.floor(Math.random() * problemCount);
        const randomProblem = await Problem.findOne({ offset: randomIndex });
        return randomProblem;
    }

    async getProblem(id: string) {
        const problem = await Problem.findByPk(id);
        return problem;
    }

    async compareResult(id: string, returnedData: string) {
        // Fetch the test cases by problem ID
        const testCases = await Testcase.findAll({ where: { problem_id: id } });

        // Iterate over all test cases and compare the results
        for (const testCase of testCases) {
            const expectedOutput = testCase.expected_output;
            if (returnedData !== expectedOutput) {
                return {
                    success: false,
                    failedTestCase: {
                        test_id: testCase.test_id,
                        input_data: testCase.input_data,
                        expected_output: testCase.expected_output,
                        returnedData: returnedData
                    }
                };
            }
        }

        return { success: true };
    }
}