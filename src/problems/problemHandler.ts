import { ProblemService } from "../services/problemService";

enum languageENUM {
    PYTHON = 71, // python (3.8)
    JAVASCRIPT = 63,
    // JAVA = 62,
    // CPP = 54, // GCC(3.9)
}

interface InputProcessor {
    processInput(input : string) : string;
}

class PythonProcessor implements InputProcessor {
    processInput(code: string): string {
        return `

import sys, json
    
${code}`;
    }

}

class JavascriptProcessor implements InputProcessor {
    processInput(code: string): string {
        return `
${code}    
const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();`;
    }
}

interface ProblemModifier {
    //returns string
    getInputProcessingCode(processor : InputProcessor) : string;
}

class TwoSumModifier implements ProblemModifier {
    private getLanguageFromProcessor(processor: InputProcessor): languageENUM {
        if (processor instanceof PythonProcessor) {
            return languageENUM.PYTHON;
        } else if (processor instanceof JavascriptProcessor) {
            return languageENUM.JAVASCRIPT;
        }
        throw new Error("Unsupported Processor Type");
    }

    getInputProcessingCode(processor : InputProcessor): string {
        
        const language_specific_code_hashmap = {
            [languageENUM.PYTHON] : 
`
input_data = json.loads(sys.stdin.read().strip())
if __name__ == "__main__":
    nums, target = input_data
    result = twoSum(nums, target)
    print(result)`,
            [languageENUM.JAVASCRIPT] : 
`
const [nums, target] = JSON.parse(input);
const result = twoSum(nums, target);
console.log(result);`
        };

        return language_specific_code_hashmap[this.getLanguageFromProcessor(processor)]; //default is javascript
    }
}

export class ProblemHandler {

    private problemService = new ProblemService();
    private processor : InputProcessor;


    constructor(private problem_id: string, private languageId : number, private submitted_code: string) 
    {
        this.processor = this.getProcessor(languageId);
    }

    private getProcessor(languageId : number) : InputProcessor {

        console.log("CHOSING PROCESSOR ")

        switch(languageId) {
            case languageENUM.PYTHON:
                return new PythonProcessor();
            case languageENUM.JAVASCRIPT:
                return new JavascriptProcessor();
            default:
                throw new Error(`Unsupported Language : ${languageId}`);
        }
    }

    private getProblemModifier(problemTitle : string) : ProblemModifier {
        switch(problemTitle){
            case "Two Sum":
                return new TwoSumModifier();
            default:
                throw new Error(`Unsupported Problem : ${problemTitle}`)
        }
    }
    
    modifySubmittedCode = async () => {
        console.log("Problem ID", this.problem_id);

        const problemTitle = await this.problemService.getProblemTitle(this.problem_id);
        
        //get a modifier to modify each problem -> TwoSumModifier()
        const modifier = this.getProblemModifier(problemTitle || "");

        console.log("MODIFIER : ", modifier);

        const inputProcessing = this.processor.processInput(this.submitted_code);

        console.log('INPUT PROCESSING %%% ', inputProcessing, "\n%%%\n");

        const problemSpecifiedCode = modifier.getInputProcessingCode(this.processor);
        console.log('specified code %%% ', problemSpecifiedCode, "\n%%%\n");


        const modified_code = `${inputProcessing}\n${problemSpecifiedCode}`

        console.log("FINAL CHECK %%% \n", modified_code)

        return modified_code;
    }

}
