import { useState } from 'react';
import { Zap, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';

const topics = [
  {
    id: 1,
    title: 'Props Kya Hote Hain?',
    color: '#f59e0b',
    summary: 'Props (properties) wo data hai jo parent component apne child ko pass karta hai. Props read-only hote hain.',
    points: [
      'Props parent se child mein pass hote hain.',
      'Props component ke function parameters mein milte hain.',
      'Props object ki form mein aate hain.',
      'Props immutable hain — child directly change nahi kar sakta.',
      'Koi bhi data type prop ban sakta hai — string, number, array, object, function.',
    ],
    example: `// Parent component
function App() {
  return (
    <UserCard 
      name="Vikash Chauhan"
      age={22}
      isLoggedIn={true}
      skills={['React', 'JavaScript']}
    />
  );
}

// Child component — props receive karta hai
function UserCard({ name, age, isLoggedIn, skills }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isLoggedIn ? '🟢 Online' : '🔴 Offline'}</p>
      <ul>
        {skills.map(skill => <li key={skill}>{skill}</li>)}
      </ul>
    </div>
  );
}`,
    note: '💡 Props ko destructure karo function parameters mein — { name, age } instead of props.name, props.age.',
  },
  {
    id: 2,
    title: 'Props Default Values',
    color: '#007acc',
    summary: 'Props ke liye default values set kar sakte ho — agar parent pass na kare toh default use hoga.',
    points: [
      'Default values = assignment se set karo in parameters.',
      'defaultProps property se bhi set kar sakte ho (purana tarika).',
      'Default values safety provide karti hain.',
      'Optional props ke liye default values zaroori hain.',
    ],
    example: `// Method 1: Destructuring mein default value
function Button({ 
  text = "Click Me",      // default text
  color = "blue",         // default color
  size = "medium",        // default size
  onClick = () => {}      // default empty function
}) {
  return (
    <button 
      className={\`btn btn-\${color} btn-\${size}\`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// Usage:
<Button />                          // sab defaults use karega
<Button text="Submit" color="red"/> // custom values
<Button onClick={handleSubmit} />   // sirf onClick custom

// Method 2: defaultProps (purana lekin kaam karta hai)
Button.defaultProps = {
  text: "Click Me",
  color: "blue"
};`,
    note: '💡 Modern React mein Method 1 (destructuring default) prefer karo.',
  },
  {
    id: 3,
    title: 'children Prop',
    color: '#a855f7',
    summary: 'children ek special prop hai jo component ke opening aur closing tags ke beech ka content hold karta hai.',
    points: [
      'children wo content hai jo component tags ke andar likha hota hai.',
      'Koi bhi JSX children ban sakta hai — text, elements, components.',
      'Wrapper components banane ke liye perfect hai.',
      'props.children ya destructuring { children } se access karo.',
    ],
    example: `// children prop use karna
function Card({ title, children, className = "" }) {
  return (
    <div className={\`card \${className}\`}>
      <h2>{title}</h2>
      <div className="card-body">
        {children}  {/* Yahan pe child content aayega */}
      </div>
    </div>
  );
}

// Usage — kuch bhi children ban sakta hai
function App() {
  return (
    <>
      {/* Simple text children */}
      <Card title="Hello">
        <p>Ye mera content hai</p>
      </Card>
      
      {/* Complex children */}
      <Card title="Profile" className="profile-card">
        <img src="/avatar.jpg" alt="User" />
        <h3>Vikash Chauhan</h3>
        <button>Follow</button>
      </Card>
    </>
  );
}`,
    note: '💡 Layout components (Card, Modal, Sidebar) mein children prop bahut useful hai.',
  },
  {
    id: 4,
    title: 'State Kya Hai?',
    color: '#22c55e',
    summary: 'State component ka "memory" hai — wo data jo time ke saath change ho sakta hai aur UI ko re-render karta hai.',
    points: [
      'State component-specific data hai jo change ho sakta hai.',
      'State change hone par component automatically re-render hota hai.',
      'useState() hook se state banate hain.',
      'State immutable nahi — set function se update karte hain.',
      'State local hoti hai — dusre components directly access nahi kar sakte.',
    ],
    example: `import { useState } from 'react';

function Counter() {
  // useState(initialValue) => [currentValue, setterFunction]
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Vikash");
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Naam likho"
      />
      <p>Hello, {name}!</p>
      
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>Ye content toggle hota hai!</p>}
    </div>
  );
}`,
    note: '💡 State ko directly mutate mat karo — hamesha setter function (setCount) use karo.',
  },
  {
    id: 5,
    title: 'State Update — Functional Form',
    color: '#06b6d4',
    summary: 'Jab new state purani state pe depend kare, toh functional update form use karo — bugs se bachta hai.',
    points: [
      'setState(prevState => newState) — functional form.',
      'Async updates mein previous state stale ho sakti hai.',
      'Functional form hamesha latest state use karta hai.',
      'Batched updates mein bhi correct kaam karta hai.',
    ],
    example: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ Potentially buggy (stale state)
  const badIncrement = () => {
    setCount(count + 1); // count could be stale
    setCount(count + 1); // same value — only increments by 1!
  };
  
  // ✅ Correct way — functional update
  const goodIncrement = () => {
    setCount(prev => prev + 1); // prev is always latest
    setCount(prev => prev + 1); // increments by 2!
  };
  
  // ✅ Object state update
  const [user, setUser] = useState({ name: "Vikash", age: 22 });
  
  const updateAge = () => {
    // Spread purana state, sirf age update karo
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={goodIncrement}>+2</button>
      <p>Age: {user.age}</p>
      <button onClick={updateAge}>Birthday!</button>
    </div>
  );
}`,
    note: '💡 Object/Array state ke liye spread operator use karo — directly mutate mat karo.',
  },
  {
    id: 6,
    title: 'Props vs State Comparison',
    color: '#ef4444',
    summary: 'Props aur State dono component mein data rakhte hain, lekin inke kaam alag hain.',
    points: [
      'Props: Parent se aata hai | State: Component khud manage karta hai.',
      'Props: Read-only hai | State: Update ho sakti hai.',
      'Props: Component ke bahar decide hota hai | State: Andar decide hota hai.',
      'Props change hone par component re-render hota hai.',
      'State change hone par component re-render hota hai.',
    ],
    example: `// Props — Parent se aata hai, child read-only
function ProductCard({ name, price, onAddToCart }) {
  return (
    <div>
      <h3>{name}</h3>        {/* props — read only */}
      <p>₹{price}</p>         {/* props — read only */}
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
}

// State — Component ki apni memory
function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);  // state
  const [isOpen, setIsOpen] = useState(false);     // state
  
  const addItem = (item) => {
    setCartItems(prev => [...prev, item]);
  };
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        Cart ({cartItems.length})
      </button>
      
      {/* Props pass karo child ko */}
      <ProductCard 
        name="React Book"           // prop
        price={499}                 // prop
        onAddToCart={() => addItem({name: "React Book"})}  // prop (function)
      />
    </div>
  );
}`,
    note: '💡 Simple rule: Parent ka data = Props. Component ki apni data = State.',
  },
  {
    id: 7,
    title: 'Lifting State Up',
    color: '#8b5cf6',
    summary: 'Jab do sibling components ek hi data share karein, toh state ko unke common parent mein move karo.',
    points: [
      'Sibling components directly state share nahi kar sakte.',
      'Solution: State ko parent mein le jao (Lift Up).',
      'Parent state rakhta hai aur dono children ko props ke zariye deta hai.',
      'Ye React ka fundamental data flow pattern hai.',
    ],
    example: `// ❌ Problem: Dono components apni state rakhte hain
// Sync nahi rehti

// ✅ Solution: State parent mein lift up karo

function TemperatureConverter() {
  // State parent mein — dono children share karenge
  const [celsius, setCelsius] = useState(0);
  
  const fahrenheit = (celsius * 9/5) + 32;
  
  return (
    <div>
      <h2>Temperature Converter</h2>
      
      {/* Dono children same state use kar rahe hain */}
      <CelsiusInput 
        value={celsius} 
        onChange={setCelsius}   // Parent ka setter pass karo
      />
      <FahrenheitDisplay value={fahrenheit} />
    </div>
  );
}

function CelsiusInput({ value, onChange }) {
  return (
    <div>
      <label>Celsius: </label>
      <input 
        type="number" 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function FahrenheitDisplay({ value }) {
  return <p>Fahrenheit: {value.toFixed(2)}°F</p>;
}`,
    note: '💡 Bahut deep lifting ho rahi hai toh Context API ya Zustand use karo.',
  },
  {
    id: 8,
    title: 'Controlled Components',
    color: '#e9950c',
    summary: 'Controlled components mein form input ki value React state se control hoti hai.',
    points: [
      'Input ka value state se aata hai — fully controlled.',
      'Har keystroke par state update hoti hai — onChange.',
      'State hamesha "single source of truth" rehti hai.',
      'Form submission aur validation aasaan ho jaati hai.',
    ],
    example: `import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();  // Page reload rokta hai
    if (!formData.email) {
      setError('Email required!');
      return;
    }
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      
      <input
        name="email"
        type="email"
        value={formData.email}         // Controlled!
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}      // Controlled!
        onChange={handleChange}
        placeholder="Password"
      />
      <label>
        <input
          name="rememberMe"
          type="checkbox"
          checked={formData.rememberMe} // Controlled!
          onChange={handleChange}
        />
        Remember Me
      </label>
      
      <button type="submit">Login</button>
    </form>
  );
}`,
    note: '💡 React Hook Form library use karo complex forms ke liye — bahut less boilerplate.',
  },
  {
    id: 9,
    title: 'PropTypes — Type Checking',
    color: '#22c55e',
    summary: 'PropTypes se define kar sakte ho ke component ko kaunse types ki props chahiye — development mein warnings deta hai.',
    points: [
      'PropTypes runtime type checking karta hai development mein.',
      'npm install prop-types se install karo.',
      'TypeScript better alternative hai long-term ke liye.',
      'Required props ke liye .isRequired add karo.',
    ],
    example: `import PropTypes from 'prop-types';

function UserCard({ name, age, email, isAdmin, tags, onDelete }) {
  return (
    <div>
      <h2>{name} {isAdmin && '👑'}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Tags: {tags.join(', ')}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// PropTypes define karo
UserCard.propTypes = {
  name: PropTypes.string.isRequired,    // Required string
  age: PropTypes.number.isRequired,     // Required number
  email: PropTypes.string,              // Optional string
  isAdmin: PropTypes.bool,              // Optional boolean
  tags: PropTypes.arrayOf(PropTypes.string),  // Array of strings
  onDelete: PropTypes.func.isRequired,  // Required function
};

// Default props
UserCard.defaultProps = {
  email: 'Not provided',
  isAdmin: false,
  tags: [],
};`,
    note: '💡 New projects mein TypeScript use karo — PropTypes se better type safety milti hai.',
  },
  {
    id: 10,
    title: 'Prop Spreading — {...props}',
    color: '#007acc',
    summary: 'Spread operator se saare props ek saath pass kar sakte ho — wrapper components mein useful.',
    points: [
      '{...props} se saare props ek saath pass ho jaate hain.',
      'Wrapper/HOC components mein bahut useful hai.',
      'Unnecessary props children tak pass ho sakti hain — be careful.',
      'Explicit props prefer karo over spreading for clarity.',
    ],
    example: `// Spread props — ek common pattern
function Button({ variant = "primary", className = "", ...rest }) {
  // ...rest mein baki sab props hain (onClick, disabled, etc.)
  return (
    <button
      className={\`btn btn-\${variant} \${className}\`}
      {...rest}  // Sab extra props button ko dedo
    />
  );
}

// Usage
<Button 
  variant="danger"
  onClick={handleDelete}
  disabled={isLoading}
  type="submit"
  aria-label="Delete item"
>
  Delete
</Button>

// Input wrapper example
function Input({ label, error, ...inputProps }) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />  {/* type, value, onChange, etc. */}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

<Input 
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  error={emailError}
  placeholder="Enter email"
/>`,
    note: '💡 Spread karte waqt dhyan rakho ke unintended props HTML elements tak na pahunchen — "unknown prop" warnings aate hain.',
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
            <pre className="bg-[#0f0f1a] border border-[#2d2d4e] rounded-lg p-4 text-[#9cdcfe] text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {t.example}
            </pre>
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

export default function StateProps() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-6 border-b border-[#2d2d4e]">
        <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
          <Zap size={20} className="text-[#f59e0b]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">State & Props</h1>
          <p className="text-[#555] text-sm mt-0.5">Data flow, component communication, aur state management basics.</p>
        </div>
        <span className="ml-auto bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-3 py-1 rounded-full border border-[#f59e0b]/20">
          {topics.length} Topics
        </span>
      </div>
      <div className="space-y-3">
        {topics.map((t) => <TopicCard key={t.id} t={t} />)}
      </div>
    </div>
  );
}
