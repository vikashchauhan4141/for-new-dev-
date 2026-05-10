import { useState } from 'react';
import { Package, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';

const topics = [
  {
    id: 1, title: 'Component Kya Hota Hai?', color: '#ef4444',
    summary: 'Component ek reusable, independent piece of UI hai jo JSX return karta hai.',
    points: [
      'Component ek JavaScript function hai.',
      'Component ka naam PascalCase mein hona chahiye — MyButton, UserCard.',
      'Component JSX return karta hai.',
      'Components compose hote hain — ek ke andar doosra.',
    ],
    example: `// ✅ Functional Component (Modern React)
function WelcomeCard({ username, role }) {
  return (
    <div className="card">
      <h2>Welcome, {username}!</h2>
      <span className="badge">{role}</span>
    </div>
  );
}

// Usage — Component ko element ki tarah use karo
function App() {
  return (
    <div>
      <WelcomeCard username="Vikash" role="Admin" />
      <WelcomeCard username="Rahul" role="User" />
    </div>
  );
}`,
    note: '💡 Ek component ek kaam kare — Single Responsibility Principle.',
  },
  {
    id: 2, title: 'Component Types', color: '#007acc',
    summary: 'React mein alag-alag types ke components hote hain — Presentational, Container, Layout, aur HOC.',
    points: [
      'Presentational: Sirf UI dikhata hai — no logic.',
      'Container: Logic rakhta hai, data fetch karta hai.',
      'Layout: Page structure banata hai — Header, Sidebar, Footer.',
      'Higher Order Component (HOC): Component enhance karta hai.',
      'Server Components (React 19): Server par render hote hain.',
    ],
    example: `// 1. Presentational Component — sirf UI
function Avatar({ src, name, size = 40 }) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
    />
  );
}

// 2. Container Component — logic + data
function UserProfileContainer() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;
  return <Avatar src={user.avatar} name={user.name} />;
}

// 3. Layout Component
function PageLayout({ children, sidebar }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}`,
    note: '💡 Logic aur UI ko alag rakhna testing aur reuse asaan banata hai.',
  },
  {
    id: 3, title: 'Component Composition', color: '#a855f7',
    summary: 'Composition ka matlab hai chhote components ko combine karke bade components banana.',
    points: [
      'children prop se flexible composition hoti hai.',
      'Slots pattern: Multiple named children pass karo.',
      'Compound Components: Related components ek saath kaam karte hain.',
      'Prefer composition over inheritance always.',
    ],
    example: `// Flexible Card Component
function Card({ header, footer, children, className = "" }) {
  return (
    <div className={\`card \${className}\`}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Alag alag use karo
function App() {
  return (
    <>
      {/* Simple card */}
      <Card>
        <p>Basic content</p>
      </Card>

      {/* Full featured card */}
      <Card
        header={<h2>User Profile</h2>}
        footer={<button>Save</button>}
        className="profile-card"
      >
        <Avatar name="Vikash" />
        <p>Frontend Developer</p>
      </Card>
    </>
  );
}`,
    note: '💡 children + named props se bahut flexible aur reusable components bante hain.',
  },
  {
    id: 4, title: 'React.memo — Performance', color: '#22c55e',
    summary: 'React.memo component ko memoize karta hai — sirf tab re-render hota hai jab props change hoon.',
    points: [
      'React.memo(Component) — props same ho toh re-render nahi.',
      'Shallow comparison karta hai props ka.',
      'useCallback ke saath use karo function props ke liye.',
      'Heavy renders rokta hai — list items ke liye useful.',
    ],
    example: `import { memo, useState, useCallback } from 'react';

// Memoized child — sirf props change hone par render
const ProductCard = memo(function ProductCard({ name, price, onAddToCart }) {
  console.log('ProductCard rendered:', name);
  return (
    <div>
      <h3>{name}</h3>
      <p>₹{price}</p>
      <button onClick={() => onAddToCart(name)}>Add to Cart</button>
    </div>
  );
});

function ProductList() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('');

  // useCallback — function reference stable rahega
  const handleAdd = useCallback((name) => {
    setCart(prev => [...prev, name]);
  }, []);

  const products = [
    { id: 1, name: 'React Book', price: 499 },
    { id: 2, name: 'JS Guide', price: 399 },
  ];

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {/* filter change par ProductCard re-render nahi hoga */}
      {products.map(p => (
        <ProductCard key={p.id} {...p} onAddToCart={handleAdd} />
      ))}
      <p>Cart: {cart.join(', ')}</p>
    </>
  );
}`,
    note: '💡 Har jagah memo mat lagao — profiling karo pehle, optimization baad mein.',
  },
  {
    id: 5, title: 'Error Boundaries', color: '#f59e0b',
    summary: 'Error Boundaries JavaScript errors pakad kar fallback UI dikhate hain — app crash nahi hoti.',
    points: [
      'Class component hota hai (functional mein nahi — abhi tak).',
      'componentDidCatch aur getDerivedStateFromError use karta hai.',
      'Rendering errors, lifecycle errors pakad sakta hai.',
      'Event handler errors nahi pakad sakta.',
      'react-error-boundary library use karo easy implementation ke liye.',
    ],
    example: `// react-error-boundary install karo
// npm install react-error-boundary

import { ErrorBoundary } from 'react-error-boundary';

// Fallback UI
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h2>Kuch galat ho gaya! 😕</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

// Use karo
function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => console.error('Caught:', error)}
      onReset={() => window.location.reload()}
    >
      <ProductList />
    </ErrorBoundary>
  );
}

// Buggy component example
function ProductList() {
  throw new Error('Data fetch failed!'); // Error Boundary pakad lega
  return <p>Products</p>;
}`,
    note: '💡 Production mein Error Boundaries zaroori hain — user ko broken UI nahi dikhna chahiye.',
  },
  {
    id: 6, title: 'Lazy Loading & Suspense', color: '#06b6d4',
    summary: 'React.lazy aur Suspense se components ko demand par load karo — faster initial load.',
    points: [
      'React.lazy(() => import("./Component")) — dynamic import.',
      'Suspense fallback UI dikhata hai loading mein.',
      'Route-level splitting ke liye perfect.',
      'Bundle size reduce hoti hai — faster first load.',
    ],
    example: `import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load karo — sirf jab zaroorat ho load hoga
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

// Loading spinner
function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      <div className="spinner" />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}`,
    note: '💡 Code splitting se 50%+ bundle size reduce ho sakti hai — zaroor use karo.',
  },
  {
    id: 7, title: 'Portals — DOM ke bahar Render', color: '#8b5cf6',
    summary: 'Portals se component ko DOM tree ke bahar kisi aur node mein render kar sakte ho — Modals ke liye perfect.',
    points: [
      'ReactDOM.createPortal(child, container) use karo.',
      'Modal, Tooltip, Dropdown ke liye perfect.',
      'CSS z-index issues solve karta hai.',
      'Event bubbling normal tarike se kaam karta hai.',
    ],
    example: `import { createPortal } from 'react-dom';
import { useState } from 'react';

// Modal Component — body mein render hoga, parent mein nahi
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    // 1st arg: Render karna kya hai
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
        <button onClick={onClose}>✕ Close</button>
        {children}
      </div>
    </div>,
    // 2nd arg: Kahan render karna hai (DOM node)
    document.body
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ overflow: 'hidden' }}>  {/* overflow nahi rokega! */}
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>I am in document.body, not here!</h2>
      </Modal>
    </div>
  );
}`,
    note: '💡 Modal overflow: hidden se trap nahi hogi — Portal use karne ka yahi main fayda hai.',
  },
];

function TopicCard({ t }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden hover:border-[#3d3d5e] transition-all"
      style={{ borderLeft: `3px solid ${t.color}` }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1f1f35] transition-colors">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: t.color + '25', color: t.color }}>{t.id}</span>
          <div>
            <h3 className="text-white font-semibold text-sm">{t.title}</h3>
            <p className="text-[#555] text-xs mt-0.5 line-clamp-1">{t.summary}</p>
          </div>
        </div>
        {open ? <ChevronDown size={16} className="text-[#555] shrink-0 ml-2" /> : <ChevronRight size={16} className="text-[#555] shrink-0 ml-2" />}
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-[#2d2d4e]">
          <p className="text-[#aaa] text-sm leading-relaxed pt-4">{t.summary}</p>
          <div>
            <h4 className="text-[#888] text-xs uppercase tracking-wider font-semibold mb-2">Key Points</h4>
            <ul className="space-y-1.5">
              {t.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-[#ccc] text-sm">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: t.color }} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#888] text-xs uppercase tracking-wider font-semibold mb-2">Code Example</h4>
            <pre className="bg-[#0f0f1a] border border-[#2d2d4e] rounded-lg p-4 text-[#9cdcfe] text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">{t.example}</pre>
          </div>
          <div className="rounded-lg p-3 text-xs leading-relaxed"
            style={{ background: t.color + '12', color: t.color, border: `1px solid ${t.color}30` }}>
            {t.note}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComponentsGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-6 border-b border-[#2d2d4e]">
        <div className="w-10 h-10 rounded-xl bg-[#ef4444]/20 flex items-center justify-center">
          <Package size={20} className="text-[#ef4444]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Components Guide</h1>
          <p className="text-[#555] text-sm mt-0.5">Component types, composition, performance aur advanced patterns.</p>
        </div>
        <span className="ml-auto bg-[#ef4444]/10 text-[#ef4444] text-xs font-semibold px-3 py-1 rounded-full border border-[#ef4444]/20">
          {topics.length} Topics
        </span>
      </div>
      <div className="space-y-3">
        {topics.map((t) => <TopicCard key={t.id} t={t} />)}
      </div>
    </div>
  );
}
