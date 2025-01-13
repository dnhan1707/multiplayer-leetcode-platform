import { json } from "sequelize";

export class SubmissionService{
    async createSubmission(submitedCode: string, languageId: number) {
        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
        const options = {
            method: 'POST',
            headers: {
              'x-rapidapi-key': 'f2e6427f71mshc6ca82be8fba5fap1a593ajsn0af01df1a15a',
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              language_id: languageId, //93 is language id, here is javascript. We can allow user to pick language on the frontend and handle this later
              source_code: btoa(submitedCode),
            //   stdin: 'SnVkZ2Uw' this is the input if needed
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            return json(result);
        } catch (error) {
            console.error(error);
        }
    }


    async getSubmission(tokenId: string){
        const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
        const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'f2e6427f71mshc6ca82be8fba5fap1a593ajsn0af01df1a15a',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return json(result)   
            // response is just a object, the import key is stdout, stdout is a base64 so we need to decode it using atob()
        } catch (error) {
            console.error(error);
        }
    }
}