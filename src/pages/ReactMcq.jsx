import { useState } from 'react';
import mcqsData from '../data/mcqs.json';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReactMcq() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questionsPerPage = 10;
  const totalPages = Math.ceil(mcqsData.length / questionsPerPage);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = mcqsData.slice(startIndex, startIndex + questionsPerPage);

  const handleOptionSelect = (questionId, selectedLetter) => {
    // Sirf ek baar select karne denge
    if (!selectedAnswers[questionId]) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: selectedLetter
      }));
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-[#333333] pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">React 19 MCQs</h1>
          <p className="text-[#cccccc] mt-2">Test your knowledge with these {mcqsData.length} questions.</p>
        </div>
        <div className="bg-[#252526] px-5 py-3 rounded-lg border border-[#333333] shadow-md w-full sm:w-auto text-center sm:text-left">
          <span className="text-[#cccccc] text-sm uppercase tracking-wider">Score</span>
          <div className="text-white font-bold text-2xl mt-1">
            <span className="text-[#007acc]">
              {Object.entries(selectedAnswers).filter(([qId, ans]) => {
                const q = mcqsData.find(q => q.id === parseInt(qId));
                return q && q.answer === ans;
              }).length}
            </span>
            <span className="text-[#666666] text-lg mx-1">/</span> 
            <span className="text-lg">{Object.keys(selectedAnswers).length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {currentQuestions.map((q) => {
          const isAnswered = !!selectedAnswers[q.id];
          const selected = selectedAnswers[q.id];
          const optionLetters = ['A', 'B', 'C', 'D'];

          return (
            <div key={q.id} className="bg-[#252526] rounded-xl p-6 border border-[#333333] shadow-sm">
              <h2 className="text-xl font-medium text-white mb-6 leading-relaxed">
                <span className="text-[#007acc] mr-2 font-bold">Q{q.id}.</span> 
                {q.question}
              </h2>
              
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const letter = optionLetters[i];
                  const isCorrectOption = q.answer === letter;
                  const isSelectedOption = selected === letter;
                  
                  let optionClass = "bg-[#1e1e1e] border-[#333333] text-[#cccccc]";
                  
                  if (isAnswered) {
                    if (isCorrectOption) {
                      optionClass = "bg-green-900/20 border-green-500/50 text-green-400";
                    } else if (isSelectedOption) {
                      optionClass = "bg-red-900/20 border-red-500/50 text-red-400";
                    } else {
                      optionClass = "bg-[#1e1e1e] border-[#333333] text-[#666666] opacity-50";
                    }
                  } else {
                    optionClass += " hover:border-[#007acc] hover:bg-[#2a2d2e] cursor-pointer";
                  }

                  return (
                    <button
                      key={letter}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(q.id, letter)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-start ${optionClass}`}
                    >
                      <span className={`font-bold mr-3 ${isAnswered && (isCorrectOption || isSelectedOption) ? '' : 'text-[#888888]'}`}>
                        {letter})
                      </span>
                      <span className="flex-1">{opt}</span>
                      
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="text-green-500 shrink-0 ml-2" size={20} />
                      )}
                      {isAnswered && isSelectedOption && !isCorrectOption && (
                        <XCircle className="text-red-500 shrink-0 ml-2" size={20} />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-6 p-5 rounded-lg bg-[#1e1e1e] border border-[#333333] animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="font-bold text-white mb-3 flex items-center">
                    <span className="bg-[#007acc] w-1.5 h-4 rounded-full mr-2"></span>
                    Explanation
                  </h3>
                  <div className="text-[#cccccc] whitespace-pre-wrap text-sm leading-relaxed font-mono bg-[#252526] p-4 rounded border border-[#333333] overflow-x-auto">
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination Container */}
      <div className="mt-12 mb-8 flex items-center justify-between bg-[#252526] p-4 rounded-xl border border-[#333333] shadow-sm">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2.5 rounded-lg transition-colors font-medium ${
            currentPage === 1 
              ? 'text-[#666666] cursor-not-allowed bg-[#1e1e1e]' 
              : 'text-white bg-[#333333] hover:bg-[#444444]'
          }`}
        >
          <ChevronLeft size={20} className="mr-1.5" />
          Previous
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-white font-bold text-lg">
            {currentPage} <span className="text-[#666666] font-normal mx-1">/</span> {totalPages}
          </span>
          <span className="text-[#888888] text-xs">Total {mcqsData.length} Qs</span>
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2.5 rounded-lg transition-colors font-medium ${
            currentPage === totalPages 
              ? 'text-[#666666] cursor-not-allowed bg-[#1e1e1e]' 
              : 'text-white bg-[#007acc] hover:bg-[#005f9e] shadow-lg shadow-[#007acc]/20'
          }`}
        >
          Next
          <ChevronRight size={20} className="ml-1.5" />
        </button>
      </div>
    </div>
  );
}
