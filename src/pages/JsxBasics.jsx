import { useState } from 'react';
import { Cpu, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';

const topics = [
  {
    id: 1,
    title: 'JSX Kya Hota Hai?',
    color: '#22c55e',
    summary: 'JSX (JavaScript XML) ek syntax extension hai jo HTML jaisa dikhta hai, lekin JavaScript ke andar likha jaata hai.',
    points: [
      'JSX = JavaScript + HTML-like syntax.',
      'Browser JSX directly nahi samjhta — Babel pehle ise JS mein convert karta hai.',
      'JSX mein JavaScript expressions {} ke andar likhi jaati hain.',
      'JSX ek single parent element return karna zaroori hai.',
      'Agar wrapper nahi chahiye toh <></> (Fragment) use karo.',
    ],
    example: `// JSX Example
function Greeting() {
  const name = "Vikash";
  const age = 22;
  
  return (
    <div>
      {/* Ye comment hai JSX mein */}
      <h1>Hello, {name}!</h1>
      <p>Tumhari age hai: {age}</p>
      <p>Next year: {age + 1}</p>
      {age >= 18 && <p>Tum adult ho ✅</p>}
    </div>
  );
}

// Babel ise convert karta hai:
// React.createElement('div', null, 
//   React.createElement('h1', null, 'Hello, Vikash!')
// )`,
    note: '💡 JSX mein class nahi, className likhte hain. for nahi, htmlFor likhte hain.',
  },
  {
    id: 2,
    title: 'JSX vs HTML — Differences',
    color: '#007acc',
    summary: 'JSX aur HTML mein kaafi similarities hain, lekin kuch important differences hain jo yaad rakhne chahiye.',
    points: [
      'class → className (JS reserved word hai "class")',
      'for → htmlFor (label mein)',
      'All HTML attributes camelCase mein — onclick → onClick',
      'Self-closing tags zaroori hain — <br /> <img /> <input />',
      'Style object deta hai — style={{ color: "red", fontSize: 16 }}',
      'JavaScript expressions {} mein — {2 + 2}, {name.toUpperCase()}',
    ],
    example: `// ❌ HTML wala style (React mein galat):
<div class="container" onclick="handleClick()">
  <label for="email">Email</label>
  <input type="text">
  <br>
</div>

// ✅ JSX wala style (React mein sahi):
<div className="container" onClick={handleClick}>
  <label htmlFor="email">Email</label>
  <input type="text" />
  <br />
  <p style={{ color: 'blue', fontSize: 16 }}>
    Styled text
  </p>
</div>`,
    note: '💡 VSCode mein "ES7+ React snippets" extension install karo — rafce type karo aur Enter press karo!',
  },
  {
    id: 3,
    title: 'JavaScript in JSX',
    color: '#a855f7',
    summary: 'JSX mein JavaScript expressions use karne ke liye curly braces {} use karte hain.',
    points: [
      '{} ke andar koi bhi valid JS expression likh sakte ho.',
      'Variables, functions, calculations — sab kuch.',
      'if-else directly nahi chal sakta — ternary use karo.',
      '&&  (short-circuit) — conditional rendering ke liye.',
      'Array.map() — list rendering ke liye.',
      'null, undefined, false render nahi hota (kuch nahi dikhta).',
    ],
    example: `function JSXExpressions() {
  const user = { name: "Vikash", isLoggedIn: true };
  const items = ["React", "Tailwind", "JavaScript"];
  
  return (
    <div>
      {/* Variable */}
      <h1>{user.name}</h1>
      
      {/* Calculation */}
      <p>{2 * 5} is ten</p>
      
      {/* Ternary - if/else */}
      <p>{user.isLoggedIn ? "Welcome!" : "Please login"}</p>
      
      {/* && - sirf tab dikhao jab condition true ho */}
      {user.isLoggedIn && <button>Logout</button>}
      
      {/* Array.map() - list render karo */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {/* Function call */}
      <p>{user.name.toUpperCase()}</p>
    </div>
  );
}`,
    note: '💡 .map() se list banate waqt har item ko unique "key" prop dena zaroori hai.',
  },
  {
    id: 4,
    title: 'JSX mein Styling',
    color: '#f59e0b',
    summary: 'React mein CSS apply karne ke teen main tarike hain — inline, className (Tailwind/CSS), aur CSS Modules.',
    points: [
      'Inline Style: style={{ color: "red", fontSize: 16 }} — camelCase use karo',
      'className: CSS file ya Tailwind classes use karo',
      'CSS Modules: Component-specific scoped CSS ke liye',
      'Numbers automatically "px" ban jaate hain — { fontSize: 16 } = 16px',
      'String values quotes mein — { color: "blue" }',
    ],
    example: `// 1. Inline Style
<h1 style={{ color: 'blue', fontSize: 24, fontWeight: 'bold' }}>
  Inline Styled
</h1>

// 2. Tailwind CSS (className)
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Tailwind Button
</button>

// 3. Regular CSS (import karo)
import './styles.css';
<div className="my-card">CSS File</div>

// 4. Dynamic Styling
const isActive = true;
<div className={\`base-class \${isActive ? 'active' : 'inactive'}\`}>
  Dynamic Class
</div>

// 5. Conditional inline style
<div style={{ 
  backgroundColor: isActive ? '#007acc' : '#333',
  padding: 16
}}>
  Conditional Style
</div>`,
    note: '💡 Tailwind use kar rahe ho toh "clsx" ya "cn" utility use karo dynamic classes ke liye.',
  },
  {
    id: 5,
    title: 'Fragments — <> </> Wrapper',
    color: '#06b6d4',
    summary: 'React mein ek component ek single element return karna zaroori hai. Fragment ek empty wrapper hai jo DOM mein add nahi hota.',
    points: [
      'Multiple elements return karne ke liye wrapper chahiye.',
      'Extra <div> add nahi karna — Fragment use karo.',
      '<React.Fragment> ya <></> (shorthand) use karo.',
      'Fragments real DOM mein render nahi hote.',
      'key prop chahiye ho toh <React.Fragment key="..."> use karo.',
    ],
    example: `import { Fragment } from 'react';

// ❌ Error — Two root elements
function Bad() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>  // Error!
  );
}

// ❌ Extra div (DOM pollute hota hai)
function WithDiv() {
  return (
    <div>  {/* unnecessary div */}
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Fragment shorthand (best)
function WithFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// ✅ With key prop (map mein)
function List({ items }) {
  return items.map((item) => (
    <Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  ));
}`,
    note: '💡 <></> ka full form hai <React.Fragment></React.Fragment>. Dono same kaam karte hain.',
  },
  {
    id: 6,
    title: 'JSX Return Rules',
    color: '#ef4444',
    summary: 'JSX return karte waqt kuch important rules follow karne hote hain.',
    points: [
      'Multi-line JSX ko parentheses () mein wrap karo.',
      'Single root element hona chahiye (ya Fragment).',
      'return ke aage curly braces nahi, parentheses use karo.',
      'JSX expression hamesha close honi chahiye — self-closing tags zaroori.',
      'Components ke naam PascalCase mein hote hain — Button, MyCard, NavBar.',
    ],
    example: `// ❌ Galat — return ke saath directly multi-line
function Bad() {
  return   // undefined return karega!
    <div>
      <h1>Title</h1>
    </div>;
}

// ✅ Sahi — parentheses use karo
function Good() {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}

// ✅ Single line — parentheses optional
function SingleLine() {
  return <h1>Hello</h1>;
}

// ✅ Fragment use karo
function WithFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}`,
    note: '💡 Hamesha parentheses use karo multi-line JSX ke liye — bugs se bachoge.',
  },
];

function TopicCard({ t }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden hover:border-[#3d3d5e] transition-all"
      style={{ borderLeft: `3px solid ${t.color}` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1f1f35] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: t.color + '25', color: t.color }}>
            {t.id}
          </span>
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

export default function JsxBasics() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-6 border-b border-[#2d2d4e]">
        <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center">
          <Cpu size={20} className="text-[#22c55e]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">JSX & Basics</h1>
          <p className="text-[#555] text-sm mt-0.5">JSX syntax, HTML differences, aur React ki basics.</p>
        </div>
        <span className="ml-auto bg-[#22c55e]/10 text-[#22c55e] text-xs font-semibold px-3 py-1 rounded-full border border-[#22c55e]/20">
          {topics.length} Topics
        </span>
      </div>
      <div className="space-y-3">
        {topics.map((t) => <TopicCard key={t.id} t={t} />)}
      </div>
    </div>
  );
}
