import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

const routeTitles = {
  '/': 'Dashboard',
  '/concepts': 'React Concepts',
  '/jsx-basics': 'JSX & Basics',
  '/state-props': 'State & Props',
  '/hooks': 'Hooks Deep Dive',
  '/components-guide': 'Components Guide',
  '/interview': 'Interview Prep',
  '/react-mcq': 'React MCQ Quiz',
  '/react-practice': 'Coding Practice',
};

export default function Navbar() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || 'ReactLearn';

  return (
    <header className="h-14 bg-[#16213e] border-b border-[#2d2d4e] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#555] hover:text-white cursor-pointer transition-colors">ReactLearn</span>
        <span className="text-[#333]">/</span>
        <span className="text-white font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:flex items-center">
          <Search size={14} className="absolute left-3 text-[#555]" />
          <input
            placeholder="Search topics..."
            className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg pl-8 pr-4 py-1.5 text-sm text-[#888] placeholder-[#444] focus:outline-none focus:border-[#007acc] transition-colors w-44"
          />
        </div>
        <button className="p-2 rounded-lg hover:bg-[#2d2d4e] text-[#555] hover:text-white transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#007acc] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
