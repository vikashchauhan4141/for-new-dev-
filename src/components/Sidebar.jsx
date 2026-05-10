import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, BookOpen, Code, ChevronLeft, Menu, Layers,
  Cpu, Zap, GitBranch, Package, LogOut, Atom, Briefcase
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <Home size={18} />, exact: true },
  { name: 'React Concepts', path: '/concepts', icon: <Layers size={18} /> },
  { name: 'JSX & Basics', path: '/jsx-basics', icon: <Cpu size={18} /> },
  { name: 'State & Props', path: '/state-props', icon: <Zap size={18} /> },
  { name: 'Hooks Deep Dive', path: '/hooks', icon: <GitBranch size={18} /> },
  { name: 'Components', path: '/components-guide', icon: <Package size={18} /> },
  { name: 'Interview Prep', path: '/interview', icon: <Briefcase size={18} /> },
  { name: 'React MCQ', path: '/react-mcq', icon: <BookOpen size={18} /> },
  { name: 'Coding Practice', path: '/react-practice', icon: <Code size={18} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-[#1a1a2e] text-[#cccccc] flex flex-col transition-all duration-300 border-r border-[#2d2d4e] shrink-0 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Logo + Toggle */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#2d2d4e] bg-[#16213e]">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#007acc] to-[#a855f7] flex items-center justify-center">
              <Atom size={15} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-wide">ReactLearn</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-[#2d2d4e] rounded-lg text-[#888] hover:text-white transition-colors ml-auto"
        >
          {isOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {isOpen && (
          <p className="text-[#555] text-[10px] uppercase tracking-widest font-semibold px-2 mb-2">
            Navigation
          </p>
        )}
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#007acc]/20 to-[#a855f7]/10 text-white border border-[#007acc]/30 font-medium'
                      : 'text-[#888] hover:bg-[#2d2d4e] hover:text-white'
                  }`
                }
                title={!isOpen ? item.name : ''}
              >
                <span className="shrink-0">{item.icon}</span>
                {isOpen && <span className="truncate">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile + Logout */}
      <div className="border-t border-[#2d2d4e] p-3 bg-[#16213e]">
        {isOpen ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#007acc] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm shrink-0">
              V
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">Vikash Chauhan</p>
              <p className="text-[#555] text-[11px] truncate">#ID-4141</p>
            </div>
            <button
              title="Logout"
              className="p-1.5 rounded-lg text-[#555] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007acc] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <button
              title="Logout"
              className="p-1.5 rounded-lg text-[#555] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
