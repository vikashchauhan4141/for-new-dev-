import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extract() {
  try {
    const data = new Uint8Array(fs.readFileSync('../src/assets/React19_MCQ_InterviewPrep.pdf'));
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdfDocument = await loadingTask.promise;
    
    let fullText = '';
    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join('\n') + '\n\n';
    }
    
    fs.writeFileSync('raw.txt', fullText);
    console.log('done extracted ' + fullText.length + ' chars');
  } catch (err) {
    console.error(err);
  }
}
extract();
