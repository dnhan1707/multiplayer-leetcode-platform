import { Problem } from "../models/problem";
import { Testcase } from "../models/testcase";
import { TestcaseService } from "./testcaseService";

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


}