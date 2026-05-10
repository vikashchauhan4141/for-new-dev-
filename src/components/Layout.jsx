import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] overflow-hidden text-[#cccccc] font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-[#1e1e1e]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
