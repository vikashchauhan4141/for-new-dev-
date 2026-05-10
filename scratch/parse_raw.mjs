import fs from 'fs';

const text = fs.readFileSync('raw.txt', 'utf8');

const questions = [];
// Split by regex that matches \n\d+\.
const parts = text.split(/\n(\d+)\.\s/);

for (let i = 1; i < parts.length; i += 2) {
    const id = parseInt(parts[i], 10);
    const body = parts[i+1];
    
    // Question text: up to A)
    const qMatch = body.match(/([\s\S]*?)(?:n\s*)?A\)/);
    const questionText = qMatch ? qMatch[1].trim().replace(/\n\s*/g, ' ') : '';
    
    // Options
    const options = [];
    const optionLetters = ['A', 'B', 'C', 'D'];
    
    for (let j = 0; j < optionLetters.length; j++) {
        const currentOpt = optionLetters[j];
        const nextOpt = optionLetters[j+1];
        
        // Match from current option to next option or answer
        let regexStr;
        if (nextOpt) {
            regexStr = `(?:n\\s*)?${currentOpt}\\)\\s*([\\s\\S]*?)(?=(?:n\\s*)?${nextOpt}\\)|4\\s*Answer:|$)`;
        } else {
            regexStr = `(?:n\\s*)?${currentOpt}\\)\\s*([\\s\\S]*?)(?=4\\s*Answer:|$)`;
        }
        
        const regex = new RegExp(regexStr);
        const match = body.match(regex);
        if (match) {
            options.push(match[1].trim().replace(/\n\s*/g, ' '));
        }
    }
    
    // Answer
    const ansMatch = body.match(/4\s*Answer:\s*([A-D])/);
    const answer = ansMatch ? ansMatch[1] : '';
    
    // Explanation
    const expMatch = body.match(/n\s*Why\?([\s\S]*)/);
    const explanation = expMatch ? expMatch[1].trim() : '';
    
    if (questionText && answer) {
        questions.push({
            id,
            question: questionText,
            options,
            answer,
            explanation
        });
    }
}

fs.mkdirSync('../src/data', { recursive: true });
fs.writeFileSync('../src/data/mcqs.json', JSON.stringify(questions, null, 2));
console.log('Parsed: ' + questions.length);
