import { ProblemService } from "../services/problemService";

export class ProblemHandler {
    constructor(private problem_id: string, private languageId : number, private submitted_code: string) {}
    private problemService = new ProblemService();

    modifySubmittedCode = async () => {
        console.log("In here");
        console.log("Problem ID", this.problem_id);
        const problemTitle = await this.problemService.getProblemTitle(this.problem_id);
        switch (problemTitle) {
            case "Two Sum":
                const twoSum = new TwoSum();
                return await twoSum.modifySubmittedCode(this.submitted_code, this.languageId);
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
    modifySubmittedCode = async (submittedCode: string, languageId : number) => {
        if (!submittedCode || !languageId) {
            throw new Error("Missing submitted code or missing languageId");
        }

        console.log("CHOSEN LANG: ", languageId)

        let modifiedCode;
        
        switch (languageId) {
            case 63: // JavaScript
                modifiedCode = `
                    ${submittedCode}

                    const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();
                    const [nums, target] = JSON.parse(input);
                    const result = twoSum(nums, target);
                    console.log(result);
                `;
                break;

            case 54: // C++
                modifiedCode = `
                    #include <iostream>
                    #include <vector>
                    #include <nlohmann/json.hpp>
                    using namespace std;
                    using json = nlohmann::json;
                    
                    ${submittedCode}
                    
                    int main() {
                        string input;
                        getline(cin, input);
                        json j = json::parse(input);
                        vector<int> nums = j[0];
                        int target = j[1];
                        vector<int> result = twoSum(nums, target);
                        
                        cout << "[" << result[0] << ", " << result[1] << "]" << endl;
                        return 0;
                    }
                `;
                break;

            case 100: // Python
                modifiedCode = 
                `import sys, json\n
                ${submittedCode}   
                input_data = json.loads(sys.stdin.read().strip())
                nums, target = input_data\nresult = two_sum(nums, target)
                print(result)`;
            
                break;

            case 62: // Java
                modifiedCode = `
                    import java.util.*;
                    ${submittedCode}
                    
                    public class Main {
                        public static void main(String[] args) {
                            Scanner scanner = new Scanner(System.in);
                            String input = scanner.nextLine();
                            scanner.close();
                            
                            ObjectMapper objectMapper = new ObjectMapper();
                            int[][] parsedInput = objectMapper.readValue(input, int[][].class);
                            int[] nums = parsedInput[0];
                            int target = parsedInput[1][0];
                            
                            int[] result = twoSum(nums, target);
                            System.out.println(Arrays.toString(result));
                        }
                    }
                `;
                break;

            default:
                throw new Error("Unsupported languageId");
        }
        
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
