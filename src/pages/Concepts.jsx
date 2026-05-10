import { useState } from 'react';
import { ChevronDown, ChevronRight, Layers, CheckCircle2 } from 'lucide-react';

const concepts = [
  {
    id: 1,
    title: 'React Kya Hai?',
    color: '#007acc',
    summary: 'React ek JavaScript library hai jo UI (User Interface) banane ke liye use hoti hai. Facebook ne banaya hai.',
    points: [
      'React ek front-end JavaScript library hai — framework nahi.',
      'Component-based architecture use karta hai.',
      'Virtual DOM use karta hai for fast rendering.',
      'React 19 latest stable version hai with new features like Server Components, Actions, etc.',
      'Single Page Applications (SPA) banane ke liye best hai.',
    ],
    example: `// Simplest React Component
function Hello() {
  return <h1>Namaste, React! 🙏</h1>;
}

export default Hello;`,
    note: '💡 React sirf UI banata hai. Routing ke liye React Router aur state ke liye Zustand/Redux use karte hain.',
  },
  {
    id: 2,
    title: 'Component-Based Architecture',
    color: '#a855f7',
    summary: 'React mein har cheez ek "Component" hoti hai — ek reusable, independent UI piece.',
    points: [
      'Components JavaScript functions hain jo JSX return karte hain.',
      'Components reusable hote hain — ek baar banao, kahin bhi use karo.',
      'Parent component apne child components ko data pass karta hai props ke zariye.',
      'Component ka naam hamesha Capital Letter se shuru hota hai.',
      'Components tree structure mein hote hain.',
    ],
    example: `// Parent Component
function App() {
  return (
    <div>
      <Header />  {/* Child Component */}
      <Main />    {/* Child Component */}
      <Footer />  {/* Child Component */}
    </div>
  );
}

// Child Component
function Header() {
  return <header>My App Header</header>;
}`,
    note: '💡 Ek component ek kaam kare. Bade components ko chhote mein todna "Component Decomposition" hai.',
  },
  {
    id: 3,
    title: 'Virtual DOM',
    color: '#22c55e',
    summary: 'React ek "Virtual DOM" use karta hai jo real DOM ka lightweight JavaScript copy hota hai.',
    points: [
      'Real DOM update karna slow hota hai — Virtual DOM fast hai.',
      'React pehle Virtual DOM update karta hai, phir difference (diff) nikalta hai.',
      'Sirf changed parts ko real DOM mein update karta hai — "Reconciliation" kehte hain.',
      'React Fiber is process ko efficiently handle karta hai.',
      'Isi wajah se React bahut fast hai.',
    ],
    example: `// Jab state change hoti hai:
// 1. React naya Virtual DOM banata hai
// 2. Purane se compare karta hai (diffing)
// 3. Sirf changed part update hota hai

function Counter() {
  const [count, setCount] = useState(0);
  
  // Sirf count wala part real DOM mein update hoga
  return (
    <div>
      <h1>Constant Heading</h1>  {/* Ye nahi badle ga */}
      <p>Count: {count}</p>       {/* Sirf ye badle ga */}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`,
    note: '💡 Virtual DOM interview mein bahut puchha jaata hai. Explain karo: Create → Diff → Patch.',
  },
  {
    id: 4,
    title: 'React 19 New Features',
    color: '#f59e0b',
    summary: 'React 19 mein kai exciting new features aaye hain jo development experience improve karte hain.',
    points: [
      'Actions: Async data mutations handle karne ka new way.',
      'useActionState: Form actions manage karne ke liye naya hook.',
      'useOptimistic: Optimistic UI updates ke liye.',
      'use() API: Promises aur context directly read karo.',
      'Server Components: Components server par render hon.',
      'Enhanced ref handling — forwardRef ki zaroorat khatam.',
    ],
    example: `// React 19 — useActionState Example
import { useActionState } from 'react';

async function submitForm(prevState, formData) {
  const name = formData.get('name');
  // async operation...
  return { message: \`Hello, \${name}!\` };
}

function MyForm() {
  const [state, action, isPending] = useActionState(submitForm, null);
  
  return (
    <form action={action}>
      <input name="name" placeholder="Apna naam likho" />
      <button disabled={isPending}>
        {isPending ? 'Saving...' : 'Submit'}
      </button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}`,
    note: '💡 React 19 mein forwardRef, memo wrapping kaafi simplify ho gayi hai.',
  },
  {
    id: 5,
    title: 'React ki File Structure',
    color: '#06b6d4',
    summary: 'Ek React project ki typical folder structure kaise hoti hai.',
    points: [
      'src/ — Tumhara saara source code yahan hoga.',
      'src/components/ — Reusable components yahan rakhte hain.',
      'src/pages/ — Page-level components (routes ke liye).',
      'src/hooks/ — Custom hooks yahan rakhte hain.',
      'src/utils/ — Helper functions aur utilities.',
      'public/ — Static files (images, favicon, etc.).',
    ],
    example: `my-react-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js`,
    note: '💡 Koi fixed rule nahi hai, lekin ye structure scalable aur maintainable hai.',
  },
  {
    id: 6,
    title: 'React kaise kaam karta hai?',
    color: '#ef4444',
    summary: 'React ke andar actual flow kya hota hai jab user interact karta hai.',
    points: [
      'User browser open karta hai → index.html load hoti hai.',
      'main.jsx run hota hai → React.createRoot() se app mount hoti hai.',
      'App.jsx render hota hai → Components tree banta hai.',
      'JSX → Babel transpile karta hai → JavaScript objects.',
      'Virtual DOM banta hai → Real DOM mein inject hota hai.',
      'State change → Re-render → Diffing → DOM update.',
    ],
    example: `// main.jsx — Entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// React app ko #root div mein mount karo
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// index.html mein ye hona chahiye:
// <div id="root"></div>`,
    note: '💡 React.StrictMode development mein extra checks lagata hai — production mein koi effect nahi hota.',
  },
  {
    id: 7,
    title: 'One-Way Data Flow',
    color: '#e9950c',
    summary: 'React mein data sirf ek direction mein flow karta hai — parent se child ki taraf.',
    points: [
      'Data parent component se child mein "props" ke zariye jaata hai.',
      'Child component props change nahi kar sakta — read-only hoti hain.',
      'Child ko parent ka data change karna ho toh callback function pass karte hain.',
      'Isse "Lifting State Up" kehte hain.',
      'Predictable aur debug karne mein aasaan hota hai.',
    ],
    example: `// Parent State rakhta hai
function Parent() {
  const [name, setName] = useState('React');
  
  return (
    // Child ko data (name) aur function (setName) pass karo
    <Child name={name} onChangeName={setName} />
  );
}

// Child sirf props use karta hai
function Child({ name, onChangeName }) {
  return (
    <div>
      <p>Hello, {name}!</p>
      {/* Parent ka state change karne ke liye callback use karo */}
      <button onClick={() => onChangeName('World')}>
        Change Name
      </button>
    </div>
  );
}`,
    note: '💡 Agar many components ko same data chahiye, toh Context API ya Zustand use karo.',
  },
  {
    id: 8,
    title: 'Declarative vs Imperative',
    color: '#8b5cf6',
    summary: 'React "declarative" hai — tum WHAT batao, React HOW manage karta hai.',
    points: [
      'Imperative: "Pehle ye karo, phir vo karo, phir ye karo."',
      'Declarative: "Mujhe ye chahiye" — implementation React sambhalega.',
      'React mein tum describe karte ho UI kaise dikhna chahiye at any state.',
      'React automatically UI update karta hai jab state change hoti hai.',
      'Code simple, readable aur maintainable hota hai.',
    ],
    example: `// ❌ Imperative (Vanilla JS):
const button = document.getElementById('btn');
const counter = document.getElementById('counter');
let count = 0;
button.addEventListener('click', () => {
  count++;
  counter.textContent = count; // Manually update karo
});

// ✅ Declarative (React):
function Counter() {
  const [count, setCount] = useState(0);
  
  // Bas describe karo UI kaise dikhna chahiye
  // React baaki sambhal lega!
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`,
    note: '💡 Declarative approach se bugs kam hote hain aur code predict karna aasaan hota hai.',
  },
];

function ConceptCard({ c }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden hover:border-[#3d3d5e] transition-all"
      style={{ borderLeft: `3px solid ${c.color}` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1f1f35] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: c.color + '25', color: c.color }}
          >
            {c.id}
          </span>
          <div>
            <h3 className="text-white font-semibold text-sm">{c.title}</h3>
            <p className="text-[#555] text-xs mt-0.5 line-clamp-1">{c.summary}</p>
          </div>
        </div>
        {open ? (
          <ChevronDown size={16} className="text-[#555] shrink-0 ml-2" />
        ) : (
          <ChevronRight size={16} className="text-[#555] shrink-0 ml-2" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-[#2d2d4e]">
          <div className="pt-4">
            <p className="text-[#aaa] text-sm leading-relaxed">{c.summary}</p>
          </div>

          <div>
            <h4 className="text-[#888] text-xs uppercase tracking-wider font-semibold mb-2">Key Points</h4>
            <ul className="space-y-1.5">
              {c.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-[#ccc] text-sm">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: c.color }} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#888] text-xs uppercase tracking-wider font-semibold mb-2">Code Example</h4>
            <pre className="bg-[#0f0f1a] border border-[#2d2d4e] rounded-lg p-4 text-[#9cdcfe] text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {c.example}
            </pre>
          </div>

          <div
            className="rounded-lg p-3 text-xs leading-relaxed"
            style={{ background: c.color + '12', color: c.color, border: `1px solid ${c.color}30` }}
          >
            {c.note}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Concepts() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-6 border-b border-[#2d2d4e]">
        <div className="w-10 h-10 rounded-xl bg-[#007acc]/20 flex items-center justify-center">
          <Layers size={20} className="text-[#007acc]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">React Concepts</h1>
          <p className="text-[#555] text-sm mt-0.5">
            React ke core concepts — beginner se intermediate tak.
          </p>
        </div>
        <span className="ml-auto bg-[#007acc]/10 text-[#007acc] text-xs font-semibold px-3 py-1 rounded-full border border-[#007acc]/20">
          {concepts.length} Topics
        </span>
      </div>

      <div className="space-y-3">
        {concepts.map((c) => (
          <ConceptCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}
