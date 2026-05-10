import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  let title = 'Home';
  if (location.pathname === '/react-mcq') title = 'React MCQ';
  else if (location.pathname === '/react-practice') title = 'React Practice Quesn';

  return (
    <header className="h-12 bg-[#333333] border-b border-[#1e1e1e] flex items-center px-4 shrink-0">
      <div className="flex items-center text-[#cccccc] text-sm space-x-2">
        <span className="hover:text-white cursor-pointer">Learn React</span>
        <span>/</span>
        <span className="text-white font-medium">{title}</span>
      </div>
    </header>
  );
}
