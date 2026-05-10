import { useNavigate } from 'react-router-dom';
import {
  Terminal, Package, Zap, CheckCircle2, BookOpen, Code,
  Layers, Cpu, GitBranch, ArrowRight, Star, Clock, Target
} from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: <Terminal size={20} />,
    title: 'Node.js Install Karo',
    color: '#22c55e',
    commands: ['# Pehle Node.js download karo', 'https://nodejs.org/en/download', '# Version check karo', 'node -v', 'npm -v'],
    desc: 'Node.js install karna zaroori hai React chalane ke liye. LTS version use karo.',
  },
  {
    step: 2,
    icon: <Package size={20} />,
    title: 'React App Create Karo (Vite)',
    color: '#007acc',
    commands: [
      '# Naya React app create karo Vite ke saath',
      'npm create vite@latest my-app -- --template react',
      '',
      '# Project folder mein jao',
      'cd my-app',
      '',
      '# Dependencies install karo',
      'npm install',
      '',
      '# Dev server start karo',
      'npm run dev',
    ],
    desc: 'Vite fast hai aur modern React 19 support karta hai. "my-app" ki jagah apna naam dalo.',
  },
  {
    step: 3,
    icon: <Zap size={20} />,
    title: 'Tailwind CSS v4 Install Karo',
    color: '#06b6d4',
    commands: [
      '# Tailwind CSS install karo',
      'npm install tailwindcss @tailwindcss/vite',
      '',
      '# vite.config.js mein add karo:',
      "import tailwindcss from '@tailwindcss/vite'",
      'plugins: [react(), tailwindcss()]',
      '',
      '# index.css mein add karo:',
      '@import "tailwindcss";',
    ],
    desc: 'Tailwind v4 mein config file nahi chahiye. Bas import karo aur use karo!',
  },
  {
    step: 4,
    icon: <CheckCircle2 size={20} />,
    title: 'Ready Ho Gaye!',
    color: '#a855f7',
    commands: [
      '# Project structure:',
      'my-app/',
      '├── src/',
      '│   ├── App.jsx',
      '│   ├── main.jsx',
      '│   └── index.css  ← Tailwind import',
      '├── index.html',
      '└── vite.config.js ← Tailwind plugin',
    ],
    desc: 'Tumhara React 19 + Tailwind v4 setup ready hai. Ab sikhna shuru karo!',
  },
];

const modules = [
  { name: 'React Concepts', path: '/concepts', icon: <Layers size={18} />, color: '#007acc', desc: 'Core concepts aur fundamentals', count: 8 },
  { name: 'JSX & Basics', path: '/jsx-basics', icon: <Cpu size={18} />, color: '#22c55e', desc: 'JSX syntax aur HTML differences', count: 6 },
  { name: 'State & Props', path: '/state-props', icon: <Zap size={18} />, color: '#f59e0b', desc: 'Data flow aur component communication', count: 10 },
  { name: 'Hooks Deep Dive', path: '/hooks', icon: <GitBranch size={18} />, color: '#a855f7', desc: 'useState, useEffect aur more', count: 12 },
  { name: 'Components Guide', path: '/components-guide', icon: <Package size={18} />, color: '#ef4444', desc: 'Reusable UI building blocks', count: 7 },
  { name: 'React MCQ Quiz', path: '/react-mcq', icon: <BookOpen size={18} />, color: '#06b6d4', desc: '100 MCQ questions with explanations', count: 100 },
  { name: 'Coding Practice', path: '/react-practice', icon: <Code size={18} />, color: '#e9950c', desc: 'Hands-on coding challenges', count: 30 },
];

const stats = [
  { label: 'Total Topics', value: '7', icon: <Layers size={20} />, color: '#007acc' },
  { label: 'MCQ Questions', value: '100', icon: <BookOpen size={20} />, color: '#a855f7' },
  { label: 'Practice Tasks', value: '30', icon: <Code size={20} />, color: '#22c55e' },
  { label: 'Est. Hours', value: '40+', icon: <Clock size={20} />, color: '#f59e0b' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-10">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#2d2d4e] p-8 md:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#007acc]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#a855f7]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#007acc]/20 text-[#007acc] text-xs font-semibold px-3 py-1 rounded-full border border-[#007acc]/30">
              🚀 React 19 Learning Path
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            React 19 Seekho —{' '}
            <span className="bg-gradient-to-r from-[#007acc] to-[#a855f7] bg-clip-text text-transparent">
              Step by Step
            </span>
          </h1>
          <p className="text-[#888] text-base md:text-lg max-w-2xl leading-relaxed">
            Ek beginner-friendly React 19 learning platform. Concepts samjho, MCQ deke test karo, aur real coding practice karo.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => navigate('/concepts')}
              className="flex items-center gap-2 bg-[#007acc] hover:bg-[#005f9e] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-[#007acc]/25 hover:shadow-[#007acc]/40"
            >
              Seekhna Shuru Karo <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate('/react-mcq')}
              className="flex items-center gap-2 bg-[#2d2d4e] hover:bg-[#3d3d5e] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all border border-[#3d3d5e]"
            >
              MCQ Quiz Try Karo <Star size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-4 flex items-center gap-3 hover:border-[#3d3d5e] transition-colors"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: s.color + '20', color: s.color }}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-[#555] text-xs">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Setup Guide */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#007acc]/20 flex items-center justify-center">
            <Terminal size={16} className="text-[#007acc]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">React + Tailwind Setup Guide</h2>
            <p className="text-[#555] text-sm">Pehli baar install karna hai? Ye steps follow karo.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden hover:border-[#3d3d5e] transition-all group"
            >
              <div
                className="px-5 py-3.5 flex items-center gap-3 border-b border-[#2d2d4e]"
                style={{ borderLeft: `3px solid ${s.color}` }}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: s.color + '20', color: s.color }}
                >
                  {s.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: s.color + '25', color: s.color }}
                    >
                      Step {s.step}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mt-0.5">{s.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[#888] text-xs mb-3 leading-relaxed">{s.desc}</p>
                <div className="bg-[#0f0f1a] rounded-lg p-3 font-mono text-xs overflow-x-auto border border-[#2d2d4e]">
                  {s.commands.map((cmd, i) => (
                    <div key={i} className={`${cmd === '' ? 'h-2' : ''} ${cmd.startsWith('#') ? 'text-[#555]' : cmd.startsWith('http') ? 'text-[#007acc] underline cursor-pointer' : 'text-[#9cdcfe]'}`}>
                      {cmd !== '' && (
                        <span>
                          {!cmd.startsWith('#') && !cmd.startsWith('http') && !cmd.startsWith('my-app') && !cmd.startsWith('├') && !cmd.startsWith('│') && !cmd.startsWith('└') && !cmd.startsWith('import') && !cmd.startsWith('plugins') && !cmd.startsWith('@') ? (
                            <span className="text-[#555] select-none mr-1">$</span>
                          ) : null}
                          {cmd}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Modules */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#a855f7]/20 flex items-center justify-center">
            <Target size={16} className="text-[#a855f7]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">Learning Modules</h2>
            <p className="text-[#555] text-sm">Har module mein theory, examples aur practice hai.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <button
              key={m.name}
              onClick={() => navigate(m.path)}
              className="text-left bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 hover:border-[#3d3d5e] hover:bg-[#1f1f35] transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: m.color + '20', color: m.color }}
                >
                  {m.icon}
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: m.color + '15', color: m.color }}
                >
                  {m.count} items
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{m.name}</h3>
              <p className="text-[#555] text-xs leading-relaxed">{m.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-[#444] text-xs group-hover:text-[#007acc] transition-colors">
                <span>Explore</span>
                <ArrowRight size={12} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Note */}
      <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 flex gap-4 items-start">
        <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center shrink-0 mt-0.5">
          <Star size={16} className="text-[#f59e0b]" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-1">💡 Pro Tip for Beginners</h3>
          <p className="text-[#888] text-sm leading-relaxed">
            Pehle <span className="text-white font-medium">React Concepts</span> padhkar basics clear karo. Phir{' '}
            <span className="text-white font-medium">JSX & Basics</span> samjho. Uske baad{' '}
            <span className="text-white font-medium">State & Props</span> seekho. Finally{' '}
            <span className="text-white font-medium">MCQ Quiz</span> deke apna knowledge test karo! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
