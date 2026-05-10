import fs from 'fs';

const text = fs.readFileSync('raw_coding.txt', 'utf8');

// Section headers in the PDF
const sectionHeaders = [
  'Section 1 - React 19 New Features',
  'Section 2 - API Integration',
  'Section 3 - Performance & React.memo / useMemo',
  'Section 4 - useReducer & State Management',
  'Section 5 - Zustand',
  'Section 6 - Custom Hooks',
  'Section 7 - React Router',
  'Section 8 - Patterns & Best Practices',
];

const questions = [];

// Split lines for processing
const lines = text.split('\n');

let i = 0;
let currentSection = 'React 19';
let qId = 0;

while (i < lines.length) {
  const line = lines[i].trim();
  
  // Track sections
  const secMatch = sectionHeaders.find(s => line.startsWith(s));
  if (secMatch) {
    currentSection = secMatch.replace('Section \\d+ - ', '').replace(/^Section \d+ - /, '');
    i++;
    continue;
  }
  
  // Detect question number pattern: "Q0" followed by number on next line
  if (line === 'Q0' && i + 1 < lines.length) {
    const nextLine = lines[i+1].trim();
    if (/^\d+$/.test(nextLine)) {
      qId = parseInt(nextLine);
      i += 2;
      
      // Collect question title (lines until SETUP or TASK or INSTALL)
      let titleLines = [];
      while (i < lines.length && !['SETUP', 'TASK', 'INSTALL', 'ANSWER'].includes(lines[i].trim())) {
        if (lines[i].trim()) titleLines.push(lines[i].trim());
        i++;
      }
      const title = titleLines.join(' ');
      
      // Collect SETUP (optional)
      let setup = '';
      if (lines[i]?.trim() === 'SETUP' || lines[i]?.trim() === 'INSTALL') {
        i++;
        let setupLines = [];
        while (i < lines.length && lines[i].trim() !== 'TASK' && lines[i].trim() !== 'ANSWER') {
          setupLines.push(lines[i]);
          i++;
        }
        setup = setupLines.join('\n').trim();
      }
      
      // Collect TASK
      let task = '';
      if (lines[i]?.trim() === 'TASK') {
        i++;
        let taskLines = [];
        while (i < lines.length && lines[i].trim() !== 'ANSWER') {
          taskLines.push(lines[i]);
          i++;
        }
        task = taskLines.join('\n').trim();
      }
      
      // Collect ANSWER
      let answer = '';
      if (lines[i]?.trim() === 'ANSWER') {
        i++;
        let answerLines = [];
        while (i < lines.length && !lines[i].trim().startsWith('INTERVIEW TIP')) {
          answerLines.push(lines[i]);
          i++;
        }
        answer = answerLines.join('\n').trim();
      }
      
      // Collect INTERVIEW TIP
      let tip = '';
      if (lines[i]?.trim().startsWith('INTERVIEW TIP')) {
        i++;
        let tipLines = [];
        while (i < lines.length && lines[i].trim() !== 'Q0' && !sectionHeaders.some(s => lines[i].trim().startsWith(s))) {
          tipLines.push(lines[i].trim());
          i++;
        }
        tip = tipLines.filter(Boolean).join(' ');
      }
      
      if (title) {
        questions.push({
          id: qId,
          section: currentSection,
          title,
          setup,
          task,
          answer,
          tip
        });
      }
      
      continue;
    }
  }
  
  i++;
}

fs.mkdirSync('../src/data', { recursive: true });
fs.writeFileSync('../src/data/coding.json', JSON.stringify(questions, null, 2));
console.log('Parsed: ' + questions.length + ' questions');
questions.forEach(q => console.log(`Q${q.id}: ${q.title.substring(0, 60)}`));
