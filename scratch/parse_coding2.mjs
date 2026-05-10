import fs from 'fs';

const rawText = fs.readFileSync('raw_coding.txt', 'utf8');

// Step 1: Reconstruct question numbers from split digits
// e.g. "Q0\n1" => Q01, "Q1\n0" => Q10
// We will work on full text, combining these
let text = rawText;

// Combine Q-digit lines: "Q\d\n \n\d" or "Q\d\n\d"
text = text.replace(/Q(\d)\n {0,2}\n?(\d)\n/g, (_, a, b) => `__Q${a}${b}__\n`);

const lines = text.split('\n');

const STOP_WORDS = ['SETUP', 'TASK', 'INSTALL', 'ANSWER', 'INTERVIEW TIP'];
const SECTION_WORDS = ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5', 'Section 6', 'Section 7', 'Section 8'];

let currentSection = 'React 19 New Features';
const questions = [];

let i = 0;

function collectUntil(stopWords, i, lines) {
  let collected = [];
  while (i < lines.length) {
    const t = lines[i].trim();
    if (stopWords.some(sw => t.startsWith(sw))) break;
    collected.push(lines[i]);
    i++;
  }
  return { text: collected.join('\n').trim(), newI: i };
}

while (i < lines.length) {
  const line = lines[i].trim();
  
  // Detect section header
  if (SECTION_WORDS.some(s => line.startsWith(s))) {
    currentSection = line.replace(/^Section \d+ - /, '').trim();
    i++;
    continue;
  }
  
  // Detect question marker
  if (line.startsWith('__Q') && line.endsWith('__')) {
    const qNum = parseInt(line.replace('__Q', '').replace('__', ''), 10);
    i++;
    
    // Collect title until SETUP/TASK/INSTALL/ANSWER
    const titleResult = collectUntil([...STOP_WORDS, '__Q', 'Section'], i, lines);
    const title = titleResult.text.replace(/\s+/g, ' ').trim();
    i = titleResult.newI;
    
    let setup = '', task = '', answer = '', tip = '';
    
    if (lines[i]?.trim() === 'SETUP' || lines[i]?.trim() === 'INSTALL') {
      i++;
      const r = collectUntil(['TASK', 'ANSWER', ...SECTION_WORDS, '__Q'], i, lines);
      setup = r.text;
      i = r.newI;
    }
    
    if (lines[i]?.trim() === 'TASK') {
      i++;
      const r = collectUntil(['ANSWER', ...SECTION_WORDS, '__Q'], i, lines);
      task = r.text;
      i = r.newI;
    }
    
    if (lines[i]?.trim() === 'ANSWER') {
      i++;
      const r = collectUntil(['INTERVIEW TIP', ...SECTION_WORDS, '__Q'], i, lines);
      answer = r.text;
      i = r.newI;
    }
    
    if (lines[i]?.trim().startsWith('INTERVIEW TIP')) {
      i++;
      const r = collectUntil([...SECTION_WORDS, '__Q'], i, lines);
      tip = r.text.replace(/\s+/g, ' ').trim();
      i = r.newI;
    }
    
    if (title) {
      questions.push({ id: qNum, section: currentSection, title, setup, task, answer, tip });
    }
    
    continue;
  }
  
  i++;
}

fs.mkdirSync('../src/data', { recursive: true });
fs.writeFileSync('../src/data/coding.json', JSON.stringify(questions, null, 2));
console.log('Parsed: ' + questions.length + ' questions');
questions.forEach(q => console.log(`Q${q.id} [${q.section}]: ${q.title.substring(0, 60)}...`));
