import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import codingData from '../data/coding.json';
import { ChevronDown, ChevronRight, Lightbulb, Code2, ClipboardList, Settings, BookOpen, ChevronLeft } from 'lucide-react';

const SECTION_COLORS = {
  'React 19 New Features': '#007acc',
  'API Integration': '#e9950c',
  'Hooks Deep Dive': '#a855f7',
  'Performance Optimization': '#22c55e',
  'Patterns and Advanced': '#ef4444',
  'Forms and Zustand': '#06b6d4',
};

function cleanCode(raw) {
  return raw
    .replace(/\n {1,2}\n/g, '\n')
    .replace(/\n {1,2}(?=\S)/g, ' ')
    .replace(/\n +$/gm, '')
    .replace(/^ +/gm, '')
    .trim();
}

function AccordionSection({ icon, title, children, defaultOpen = false, accentColor }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#333333] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-[#2d2d2d] hover:bg-[#333333] transition-colors text-left"
        style={{ borderLeft: `3px solid ${accentColor || '#007acc'}` }}
      >
        <span className="flex items-center gap-2.5 text-white font-medium text-sm">
          {icon}
          {title}
        </span>
        {open ? <ChevronDown size={16} className="text-[#888]" /> : <ChevronRight size={16} className="text-[#888]" />}
      </button>
      {open && (
        <div className="bg-[#1e1e1e] border-t border-[#333333]">
          {children}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ q, index }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const sectionColor = SECTION_COLORS[q.section] || '#007acc';
  const cleanedCode = cleanCode(q.answer);

  // Parse task items as list
  const taskItems = q.task
    ? q.task.split(/\n/).filter(l => l.trim().match(/^\d+\./)).map(l => l.trim())
    : [];

  return (
    <div className="bg-[#252526] rounded-xl border border-[#333333] overflow-hidden shadow-sm hover:shadow-md hover:border-[#444] transition-all duration-200">
      {/* Header */}
      <div className="p-5 border-b border-[#333333]">
        <div className="flex items-start gap-4">
          <span
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: sectionColor + '33', color: sectionColor }}
          >
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: sectionColor + '22', color: sectionColor }}
              >
                {q.section}
              </span>
            </div>
            <h2 className="text-white font-semibold text-base leading-relaxed">{q.title}</h2>
          </div>
        </div>
      </div>

      {/* Body: Accordion sections */}
      <div className="p-4 space-y-3">

        {/* TASK */}
        {taskItems.length > 0 && (
          <AccordionSection
            icon={<ClipboardList size={15} />}
            title="Task Requirements"
            defaultOpen={true}
            accentColor={sectionColor}
          >
            <ul className="px-5 py-4 space-y-2">
              {taskItems.map((item, idx) => (
                <li key={idx} className="flex gap-2.5 text-[#cccccc] text-sm">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded bg-[#333] text-[#888] text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span>{item.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </AccordionSection>
        )}

        {/* SETUP */}
        {q.setup && (
          <AccordionSection
            icon={<Settings size={15} />}
            title="Setup / Install"
            accentColor="#e9950c"
          >
            <div className="px-5 py-4 text-sm text-[#cccccc] font-mono whitespace-pre-wrap bg-[#1a1a1a]">
              {q.setup.replace(/\n +/g, '\n').trim()}
            </div>
          </AccordionSection>
        )}

        {/* ANSWER / CODE */}
        <AccordionSection
          icon={<Code2 size={15} />}
          title="Solution Code"
          defaultOpen={showAnswer}
          accentColor="#22c55e"
        >
          <div className="relative">
            {!showAnswer ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <p className="text-[#888] text-sm">Code answer is hidden. Try solving it first!</p>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#22c55e]/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors"
                >
                  Reveal Answer
                </button>
              </div>
            ) : (
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  fontSize: '13px',
                  lineHeight: '1.6',
                  background: '#1a1a1a',
                }}
                showLineNumbers
                wrapLines
              >
                {cleanedCode}
              </SyntaxHighlighter>
            )}
          </div>
        </AccordionSection>

        {/* INTERVIEW TIP */}
        {q.tip && (
          <AccordionSection
            icon={<Lightbulb size={15} />}
            title="Interview Tip (Hinglish)"
            accentColor="#f59e0b"
          >
            <div className="px-5 py-4">
              <p className="text-[#fbbf24] text-sm leading-relaxed italic">💡 {q.tip}</p>
            </div>
          </AccordionSection>
        )}
      </div>
    </div>
  );
}

const QUESTIONS_PER_PAGE = 3;

export default function ReactPractice() {
  const [activeSection, setActiveSection] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const sections = ['All', ...Object.keys(SECTION_COLORS)];
  const filtered = activeSection === 'All'
    ? codingData
    : codingData.filter(q => q.section === activeSection);

  const totalPages = Math.ceil(filtered.length / QUESTIONS_PER_PAGE);
  const startIdx = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const pageQuestions = filtered.slice(startIdx, startIdx + QUESTIONS_PER_PAGE);

  const handleSectionChange = (sec) => {
    setActiveSection(sec);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-8 border-b border-[#333333] pb-6">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="text-[#007acc]" size={28} />
          <h1 className="text-3xl font-bold text-white">React Practice Questions</h1>
        </div>
        <p className="text-[#888] text-base">
          Practical coding challenges with full solutions, setup instructions &amp; interview tips.
          Try solving before revealing the answer!
        </p>
        <div className="mt-4 flex gap-4 text-sm text-[#888]">
          <span className="text-white"><strong className="text-[#007acc]">{codingData.length}</strong> Questions</span>
          <span>|</span>
          <span><strong className="text-white">{Object.keys(SECTION_COLORS).length}</strong> Sections</span>
        </div>
      </div>

      {/* Section Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {sections.map(sec => {
          const isActive = activeSection === sec;
          const color = SECTION_COLORS[sec];
          return (
            <button
              key={sec}
              onClick={() => handleSectionChange(sec)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                isActive
                  ? 'text-white border-transparent'
                  : 'bg-transparent text-[#888] border-[#444] hover:text-white hover:border-[#666]'
              }`}
              style={isActive ? { background: color || '#007acc', borderColor: color || '#007acc' } : {}}
            >
              {sec}
              {sec !== 'All' && (
                <span className="ml-1.5 opacity-70">
                  ({codingData.filter(q => q.section === sec).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {pageQuestions.map((q, idx) => (
          <QuestionCard key={q.id} q={q} index={startIdx + idx} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#666]">
          <p className="text-lg">No questions found for this section.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 mb-4 flex items-center justify-between bg-[#252526] p-4 rounded-xl border border-[#333333]">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
              currentPage === 1
                ? 'text-[#555] cursor-not-allowed bg-[#1e1e1e]'
                : 'text-white bg-[#333333] hover:bg-[#444444]'
            }`}
          >
            <ChevronLeft size={18} className="mr-1" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
                  page === currentPage
                    ? 'bg-[#007acc] text-white'
                    : 'text-[#888] hover:text-white hover:bg-[#333]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
              currentPage === totalPages
                ? 'text-[#555] cursor-not-allowed bg-[#1e1e1e]'
                : 'text-white bg-[#007acc] hover:bg-[#005f9e] shadow-lg shadow-[#007acc]/20'
            }`}
          >
            Next
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      )}

      <div className="mt-4 mb-4 text-center text-[#555] text-sm">
        Showing {startIdx + 1}–{Math.min(startIdx + QUESTIONS_PER_PAGE, filtered.length)} of {filtered.length} questions
      </div>
    </div>
  );
}
