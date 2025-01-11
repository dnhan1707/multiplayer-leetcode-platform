import { Problem } from "../models/problem";

export class ProblemService {
    async getRandomProblem(){
        const problemCount = await Problem.count();
        const randomIndex = Math.floor(Math.random() * problemCount);
        const randomProblem = await Problem.findOne({offset: randomIndex});
        return randomProblem;
    }
}