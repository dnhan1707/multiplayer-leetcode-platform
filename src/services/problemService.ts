import { where } from "sequelize";
import { Problem } from "../models/problem";
import { TestcaseService } from "./testcaseService";

export class ProblemService {
    async getRandomProblem() {
        const problemCount = await Problem.count();
        const randomIndex = Math.floor(Math.random() * problemCount);
        const randomProblem = await Problem.findOne({ offset: randomIndex });
        return randomProblem;
    }

    async getProblemByTitle(title: string) {
        if(title == "Random") {
            return this.getRandomProblem();
        }
        const problem = await Problem.findOne({ where : { title }})
        return problem
    }

    async getProblem(id: string) {
        const problem = await Problem.findByPk(id);
        return problem;
    }

    async getProblemTitle(id: string) {
        const problem = await this.getProblem(id);
        return problem ? problem.title : null;
    }

    async getTestCaseById(id: string) {
        const testcaseService = new TestcaseService();
        const testcases = testcaseService.getTestcaseByProblemId(id);
        return testcases;
    }
}