import { useState } from 'react';
import { ChevronDown, ChevronRight, Briefcase, Star, Zap, Flame } from 'lucide-react';

import questions from '../data/interview.json';

const levels = ['All', 'Basic', 'Intermediate', 'Advanced'];
const levelConfig = {
  Basic: { color: '#22c55e', icon: <Star size={14} />, bg: '#22c55e15' },
  Intermediate: { color: '#f59e0b', icon: <Zap size={14} />, bg: '#f59e0b15' },
  Advanced: { color: '#ef4444', icon: <Flame size={14} />, bg: '#ef444415' },
};

function QCard({ q }) {
  const [open, setOpen] = useState(false);
  const cfg = levelConfig[q.level];
  return (
    <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden hover:border-[#3d3d5e] transition-all"
      style={{ borderLeft: `3px solid ${q.color}` }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1f1f35] transition-colors gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
            style={{ background: q.color + '25', color: q.color }}>Q{q.id}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ background: cfg.bg, color: cfg.color }}>
                {cfg.icon} {q.level}
              </span>
            </div>
            <p className="text-white font-medium text-sm leading-snug">{q.q}</p>
          </div>
        </div>
        <span className="shrink-0 text-[#555]">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </button>

      {open && (
        <div className="border-t border-[#2d2d4e] px-5 pb-5 pt-4 space-y-4">
          <div>
            <p className="text-[#888] text-[11px] uppercase tracking-wider font-semibold mb-2">Answer</p>
            <pre className="text-[#ccc] text-sm leading-relaxed whitespace-pre-wrap font-sans bg-[#0f0f1a] border border-[#2d2d4e] rounded-lg p-4">
              {q.a}
            </pre>
          </div>
          <div className="rounded-lg p-3 text-xs leading-relaxed"
            style={{ background: q.color + '12', color: q.color, border: `1px solid ${q.color}30` }}>
            🎯 <strong>Interview Tip:</strong> {q.tip}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Interview() {
  const [activeLevel, setActiveLevel] = useState('All');
  const filtered = activeLevel === 'All' ? questions : questions.filter(q => q.level === activeLevel);

  const counts = {
    Basic: questions.filter(q => q.level === 'Basic').length,
    Intermediate: questions.filter(q => q.level === 'Intermediate').length,
    Advanced: questions.filter(q => q.level === 'Advanced').length,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a0a2e] border border-[#2d2d4e] p-7">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#ef4444]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444]/30 to-[#f59e0b]/20 flex items-center justify-center shrink-0">
            <Briefcase size={22} className="text-[#ef4444]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">React Interview Prep</h1>
            <p className="text-[#888] text-sm leading-relaxed">
              {questions.length} most-asked React interview questions — Basic se Advanced tak. Ye sab clear karo, interview crack ho jaayega. 🚀
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1.5"><Star size={14} className="text-[#22c55e]" /><span className="text-[#22c55e] font-semibold">{counts.Basic}</span><span className="text-[#555]">Basic</span></span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#f59e0b]" /><span className="text-[#f59e0b] font-semibold">{counts.Intermediate}</span><span className="text-[#555]">Intermediate</span></span>
              <span className="flex items-center gap-1.5"><Flame size={14} className="text-[#ef4444]" /><span className="text-[#ef4444] font-semibold">{counts.Advanced}</span><span className="text-[#555]">Advanced</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#1a1a2e] border border-[#007acc]/30 rounded-xl p-4 flex gap-3 items-start">
        <span className="text-xl shrink-0">💡</span>
        <p className="text-[#888] text-sm leading-relaxed">
          <span className="text-white font-semibold">Strategy:</span> Pehle <span className="text-[#22c55e]">Basic</span> level ke sab questions clear karo — 80% fresher interviews yahan tak hi hoti hain. Phir <span className="text-[#f59e0b]">Intermediate</span> karo — ye 2-3 year experience wale ke liye hain. <span className="text-[#ef4444]">Advanced</span> se senior roles ke chances badte hain.
        </p>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap gap-2">
        {levels.map(level => {
          const isActive = activeLevel === level;
          const cfg = levelConfig[level];
          return (
            <button key={level} onClick={() => setActiveLevel(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-2 ${isActive ? 'text-white' : 'bg-transparent text-[#666] border-[#2d2d4e] hover:text-white hover:border-[#444]'}`}
              style={isActive ? { background: cfg?.color || '#007acc', borderColor: cfg?.color || '#007acc' } : {}}>
              {cfg?.icon}
              {level}
              {level !== 'All' && <span className="opacity-70 text-xs">({counts[level]})</span>}
            </button>
          );
        })}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {filtered.map(q => <QCard key={q.id} q={q} />)}
      </div>

      {/* Footer Tip */}
      <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 text-center">
        <p className="text-2xl mb-2">🎯</p>
        <p className="text-white font-semibold mb-1">Last Tip</p>
        <p className="text-[#666] text-sm leading-relaxed max-w-lg mx-auto">
          Sirf yaad mat karo — ek chhoti project bana lo jisme ye sab concepts use kiye ho. Interviewer ko project dikhana &gt; sirf concepts batana. Real code = real confidence.
        </p>
      </div>
    </div>
  );
}
