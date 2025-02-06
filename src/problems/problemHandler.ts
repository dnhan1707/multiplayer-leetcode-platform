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
                modifiedCode = 
                    `
                    #include <iostream>
                    #include <vector>
                    #include <string>
                    #include <algorithm>

                    ${submittedCode.trim().split('\n').map(line => {
                        line = line.trim();
                        if (line.startsWith('return') || line.startsWith('{') || line.startsWith('}')) {
                            return '    ' + line; // Indent these lines one level
                        }
                        return '        ' + line; // Indent all other lines two levels
                    }).join('\n')}
                    

                    int main() {
                        std::string input;
                        std::getline(std::cin, input);
                        
                        // Parse input manually
                        std::vector<int> nums;
                        int target;
                        
                        // Remove brackets and split by comma
                        input = input.substr(1, input.length() - 2);
                        size_t pos = input.find(']');
                        std::string numsStr = input.substr(0, pos);
                        std::string targetStr = input.substr(pos + 2);
                        
                        // Parse nums
                        size_t start = 0, end = 0;
                        while ((end = numsStr.find(',', start)) != std::string::npos) {
                            nums.push_back(std::stoi(numsStr.substr(start, end - start)));
                            start = end + 1;
                        }
                        nums.push_back(std::stoi(numsStr.substr(start)));
                        
                        // Parse target
                        target = std::stoi(targetStr);
                        
                        std::vector<int> result = twoSum(nums, target);
                        
                        std::cout << "[" << result[0] << ", " << result[1] << "]" << std::endl;
                        return 0;
                    }`;
                break;

            case 71: // Python
                modifiedCode = 
`import sys, json

${submittedCode.trim().split('\n').map(line => {
    line = line.trim();
    if (line.startsWith('return')) {
        return '    ' + line; // Add 4 spaces (1 tab) before return statements
    }
    return line;
}).join('\n')}

input_data = json.loads(sys.stdin.read().strip())
nums, target = input_data
result = two_sum(nums, target)
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
