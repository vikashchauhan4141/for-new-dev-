const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:\\Users\\vikas\\Desktop\\system for learn react\\learn\\src\\assets\\React19_MCQ_InterviewPrep.pdf');

pdf(dataBuffer).then(function(data) {
    const text = data.text;
    
    const questions = [];
    
    // Split by question number pattern "1. ", "2. ", etc. at the start of a line
    const parts = text.split(/^(\d+)\.\s/m);
    
    for (let i = 1; i < parts.length; i += 2) {
        const qNumber = parseInt(parts[i], 10);
        let qBody = parts[i+1];
        
        // Extract Question Text
        // It's everything before A) or ■ A)
        const qTextMatch = qBody.match(/([\s\S]*?)(?:■\s*)?A\)/);
        const qText = qTextMatch ? qTextMatch[1].trim() : "";
        
        // Extract Options
        const options = {};
        ['A', 'B', 'C', 'D'].forEach(opt => {
            // Match until the next option, or the Answer line
            const regex = new RegExp(`(?:■\\s*)?${opt}\\)([\\s\\S]*?)(?=(?:■\\s*)?[A-D]\\)|✔ Answer:|$)`);
            const optMatch = qBody.match(regex);
            if (optMatch) {
                options[opt] = optMatch[1].trim();
            }
        });
        
        // Extract Answer
        const ansMatch = qBody.match(/✔ Answer:\s*([A-D])/);
        const answer = ansMatch ? ansMatch[1] : "";
        
        // Extract Explanation
        const expMatch = qBody.match(/■ Why\?([\s\S]*)/);
        const explanation = expMatch ? expMatch[1].trim() : "";
        
        if(qText && answer) {
            questions.push({
                id: qNumber,
                question: qText,
                options,
                answer,
                explanation
            });
        }
    }
    
    fs.mkdirSync('../src/data', { recursive: true });
    fs.writeFileSync('../src/data/mcqs.json', JSON.stringify(questions, null, 2));
    console.log(`Parsed ${questions.length} questions.`);
}).catch(console.error);
