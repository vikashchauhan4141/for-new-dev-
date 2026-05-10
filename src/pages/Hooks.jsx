import { useState } from 'react';
import { GitBranch, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';

const topics = [
  {
    id: 1, title: 'Hooks Kya Hain?', color: '#a855f7',
    summary: 'Hooks special functions hain jo React features (state, lifecycle) functional components mein use karne dete hain.',
    points: [
      'React 16.8 mein introduce hue the.',
      'Hooks sirf functional components mein use hote hain.',
      'Naam hamesha "use" se shuru hota hai — useState, useEffect.',
      'Hooks ko conditionally ya loop mein call mat karo.',
      'Custom hooks bana ke logic reuse kar sakte ho.',
    ],
    example: `// Hooks ke rules:
// 1. Sirf top level pe call karo
// 2. Sirf React functions mein call karo

import { useState, useEffect } from 'react';

function Example() {
  // ✅ Top level pe — sahi
  const [count, setCount] = useState(0);

  // ❌ Condition ke andar — galat!
  // if (count > 0) { const [x, setX] = useState(); }

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    note: '💡 ESLint plugin "eslint-plugin-react-hooks" install karo — rules automatically check karta hai.',
  },
  {
    id: 2, title: 'useState — State Management', color: '#22c55e',
    summary: 'useState component mein local state banane ka sabse basic hook hai.',
    points: [
      'useState(initialValue) returns [value, setter].',
      'Setter function se state update karo.',
      'Functional update form use karo jab new state purani pe depend kare.',
      'Object/Array ke liye spread operator zaroori hai.',
    ],
    example: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map(t => (
        <p key={t.id}
          style={{ textDecoration: t.done ? 'line-through' : 'none' }}
          onClick={() => toggleTodo(t.id)}
        >
          {t.text}
        </p>
      ))}
    </div>
  );
}`,
    note: '💡 Array/Object state direct mutate mat karo — hamesha new copy banao.',
  },
  {
    id: 3, title: 'useEffect — Side Effects', color: '#007acc',
    summary: 'useEffect component ke baad side effects run karne ke liye use hota hai — API calls, timers, subscriptions.',
    points: [
      'useEffect(fn, deps) — fn run hoga deps change hone par.',
      'Empty deps [] — sirf mount par chalega (componentDidMount).',
      'No deps — har render ke baad chalega.',
      'Cleanup function return karo subscriptions ke liye.',
      'Async function directly useEffect mein nahi daal sakte.',
    ],
    example: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Async function andar banao
    async function fetchUser() {
      setLoading(true);
      const res = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, [userId]); // userId change hone par re-run

  // Cleanup example — timer
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => clearInterval(timer); // Cleanup!
  }, []);

  if (loading) return <p>Loading...</p>;
  return <h1>{user?.name}</h1>;
}`,
    note: '💡 useEffect mein use ki gayi har variable deps array mein honi chahiye.',
  },
  {
    id: 4, title: 'useRef — DOM & Mutable Values', color: '#f59e0b',
    summary: 'useRef DOM elements access karne ya re-render trigger kiye bina mutable value store karne ke liye use hota hai.',
    points: [
      'useRef(initial) ek { current: initial } object return karta hai.',
      'ref.current change karne par re-render nahi hota.',
      'DOM elements ko ref se access karo.',
      'Previous state/props store karne ke liye useful.',
      'Timers, intervals ke IDs store karne ke liye.',
    ],
    example: `import { useRef, useEffect, useState } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  // DOM access — input focus karo
  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  );
}

// Previous value store karna
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count; // Re-render nahi karega
  });

  return (
    <div>
      <p>Current: {count} | Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}`,
    note: '💡 ref.current directly mutate karo — setState ki zaroorat nahi.',
  },
  {
    id: 5, title: 'useMemo & useCallback — Performance', color: '#06b6d4',
    summary: 'useMemo expensive calculations memoize karta hai, useCallback functions memoize karta hai — unnecessary re-renders rokta hai.',
    points: [
      'useMemo(fn, deps) — computed value memoize karta hai.',
      'useCallback(fn, deps) — function reference stable rakhta hai.',
      'Dono deps change hone par hi recalculate karte hain.',
      'Premature optimization se bachao — sirf jab zaroorat ho.',
      'Child ko callback prop pass karte waqt useCallback useful hai.',
    ],
    example: `import { useState, useMemo, useCallback } from 'react';

function ExpensiveList({ items, onItemClick }) {
  // useMemo — filtered list sirf tab recalculate karo
  // jab items change ho
  const expensiveComputation = useMemo(() => {
    console.log('Computing...'); // Har render pe nahi chalega
    return items.filter(item => item.price > 100).sort((a, b) => a.price - b.price);
  }, [items]); // Sirf items change hone par

  return expensiveComputation.map(item => (
    <div key={item.id} onClick={() => onItemClick(item.id)}>
      {item.name} - ₹{item.price}
    </div>
  ));
}

function Parent() {
  const [items, setItems] = useState([...]);
  const [count, setCount] = useState(0);

  // useCallback — function reference stable rahega
  // count change hone par bhi onItemClick naya nahi banega
  const handleItemClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []); // No deps — kabhi nahi badlega

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        Re-render Parent ({count})
      </button>
      {/* ExpensiveList re-render nahi hogi count change pe */}
      <ExpensiveList items={items} onItemClick={handleItemClick} />
    </>
  );
}`,
    note: '💡 React.memo ke saath useCallback use karo — tab hi fayda hoga.',
  },
  {
    id: 6, title: 'useContext — Global State', color: '#ef4444',
    summary: 'useContext Context API ke data ko directly component mein access karne deta hai bina prop drilling ke.',
    points: [
      'Context banao: createContext()',
      'Provider se wrap karo: <Context.Provider value={...}>',
      'Consume karo: useContext(Context)',
      'Prop drilling se bachata hai.',
      'Theme, user auth, language ke liye perfect.',
    ],
    example: `import { createContext, useContext, useState } from 'react';

// 1. Context banao
const ThemeContext = createContext('light');

// 2. Provider banao
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook banao (best practice)
function useTheme() {
  return useContext(ThemeContext);
}

// 4. Kisi bhi component mein use karo
function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header style={{ background: theme === 'dark' ? '#1a1a2e' : '#fff' }}>
      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        Toggle Theme ({theme})
      </button>
    </header>
  );
}

// App mein wrap karo
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}`,
    note: '💡 Context mein bahut zyada data mat rakho — performance issues aa sakte hain. Complex state ke liye Zustand use karo.',
  },
  {
    id: 7, title: 'useReducer — Complex State', color: '#e9950c',
    summary: 'useReducer useState ka alternative hai complex state logic ke liye — Redux jaisa pattern.',
    points: [
      'useReducer(reducer, initialState) returns [state, dispatch].',
      'reducer(state, action) => newState — pure function.',
      'dispatch({ type: "ACTION", payload: data }) se state update karo.',
      'Multiple related state values ke liye better than multiple useStates.',
    ],
    example: `import { useReducer } from 'react';

// Reducer function — pure function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <div>
      <p>Items: {cart.items.length}</p>
      <button onClick={() => dispatch({
        type: 'ADD_ITEM',
        payload: { id: 1, name: 'React Book', price: 499 }
      })}>
        Add Item
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear
      </button>
    </div>
  );
}`,
    note: '💡 useState ke liye 3+ related states ho toh useReducer better rahega.',
  },
  {
    id: 8, title: 'Custom Hooks — Logic Reuse', color: '#8b5cf6',
    summary: 'Custom hooks apne logic ko reusable functions mein extract karne ka tarika hai.',
    points: [
      'Custom hook naam "use" se shuru hona chahiye.',
      'Andar React hooks use kar sakte ho.',
      'Component-specific logic ko separate kar sakte ho.',
      'Multiple components mein same logic share karo.',
    ],
    example: `import { useState, useEffect } from 'react';

// Custom Hook — API fetch logic
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Custom Hook — LocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initialValue;
    } catch { return initialValue; }
  });

  const setStoredValue = (val) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, setStoredValue];
}

// Usage
function UsersList() {
  const { data: users, loading, error } = useFetch('/api/users');
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return users.map(u => <p key={u.id}>{u.name}</p>);
}`,
    note: '💡 Hooks library banalo — useLocalStorage, useFetch, useDebounce, useWindowSize — sab reuse hoga.',
  },
  {
    id: 9, title: 'React 19 — useActionState', color: '#007acc',
    summary: 'useActionState React 19 ka naya hook hai jo form actions aur async mutations ko easily handle karta hai.',
    points: [
      'useActionState(action, initialState) returns [state, formAction, isPending].',
      'Form ki action prop mein directly use karo.',
      'isPending loading state automatically track karta hai.',
      'Server actions ke saath bhi kaam karta hai.',
    ],
    example: `import { useActionState } from 'react'; // React 19

// Action function (async)
async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) return { error: 'Invalid credentials' };
    return { success: true, user: await res.json() };
  } catch {
    return { error: 'Network error' };
  }
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction}>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p>Welcome back!</p>}

      <input name="email" type="email" required />
      <input name="password" type="password" required />

      <button disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}`,
    note: '💡 useActionState = useReducer + async + form handling. React 19 ka game changer!',
  },
  {
    id: 10, title: 'useOptimistic — React 19', color: '#22c55e',
    summary: 'useOptimistic hook optimistic UI updates ke liye hai — server response ka wait kiye bina UI update karo.',
    points: [
      'User experience improve hota hai — instant feedback.',
      'useOptimistic(state, updateFn) returns [optimisticState, addOptimistic].',
      'Server error aane par state automatically revert hoti hai.',
      'React 19 ka naya feature.',
    ],
    example: `import { useState, useOptimistic } from 'react'; // React 19

async function sendMessage(text) {
  await new Promise(r => setTimeout(r, 1000)); // Simulate API
  return { id: Date.now(), text, sent: true };
}

function Chat() {
  const [messages, setMessages] = useState([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { ...newMessage, sending: true }]
  );

  async function handleSend(formData) {
    const text = formData.get('message');

    // Turant UI update karo (optimistic)
    addOptimisticMessage({ id: Date.now(), text });

    // Actual API call
    const saved = await sendMessage(text);
    setMessages(prev => [...prev, saved]);
  }

  return (
    <div>
      {optimisticMessages.map(msg => (
        <p key={msg.id} style={{ opacity: msg.sending ? 0.5 : 1 }}>
          {msg.text} {msg.sending && '(Sending...)'}
        </p>
      ))}
      <form action={handleSend}>
        <input name="message" />
        <button>Send</button>
      </form>
    </div>
  );
}`,
    note: '💡 Social media apps mein like/comment ke liye perfect — instant feedback, server sync baad mein.',
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

export default function Hooks() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-6 border-b border-[#2d2d4e]">
        <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center">
          <GitBranch size={20} className="text-[#a855f7]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Hooks Deep Dive</h1>
          <p className="text-[#555] text-sm mt-0.5">useState se useOptimistic tak — sab hooks ek jagah.</p>
        </div>
        <span className="ml-auto bg-[#a855f7]/10 text-[#a855f7] text-xs font-semibold px-3 py-1 rounded-full border border-[#a855f7]/20">
          {topics.length} Hooks
        </span>
      </div>
      <div className="space-y-3">
        {topics.map((t) => <TopicCard key={t.id} t={t} />)}
      </div>
    </div>
  );
}
