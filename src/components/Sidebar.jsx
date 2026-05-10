import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Home, BookOpen, Code, ChevronLeft } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'React MCQ', path: '/react-mcq', icon: <BookOpen size={20} /> },
    { name: 'React Practice Quesn', path: '/react-practice', icon: <Code size={20} /> },
  ];

  return (
    <aside className={`bg-[#252526] text-[#cccccc] flex flex-col transition-all duration-300 border-r border-[#333333] ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="h-12 flex items-center justify-between px-4 border-b border-[#333333]">
        {isOpen && <span className="font-semibold text-white tracking-wide text-xs uppercase">Explorer</span>}
        <button onClick={toggleSidebar} className="p-1 hover:bg-[#333333] rounded text-[#cccccc] hover:text-white transition-colors ml-auto">
          {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm cursor-pointer border-l-2 transition-colors ${
                    isActive
                      ? 'bg-[#37373d] text-white border-[#007acc]'
                      : 'border-transparent hover:bg-[#2a2d2e] hover:text-white'
                  }`
                }
                title={!isOpen ? item.name : ''}
              >
                <span className="flex items-center justify-center min-w-[20px]">{item.icon}</span>
                {isOpen && <span className="ml-3 truncate">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
