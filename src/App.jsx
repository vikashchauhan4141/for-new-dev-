import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ReactMcq from './pages/ReactMcq';
import ReactPractice from './pages/ReactPractice';
import Concepts from './pages/Concepts';
import JsxBasics from './pages/JsxBasics';
import StateProps from './pages/StateProps';
import Hooks from './pages/Hooks';
import ComponentsGuide from './pages/ComponentsGuide';
import Interview from './pages/Interview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="concepts" element={<Concepts />} />
          <Route path="jsx-basics" element={<JsxBasics />} />
          <Route path="state-props" element={<StateProps />} />
          <Route path="hooks" element={<Hooks />} />
          <Route path="components-guide" element={<ComponentsGuide />} />
          <Route path="interview" element={<Interview />} />
          <Route path="react-mcq" element={<ReactMcq />} />
          <Route path="react-practice" element={<ReactPractice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
