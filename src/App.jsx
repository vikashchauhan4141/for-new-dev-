import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ReactMcq from './pages/ReactMcq';
import ReactPractice from './pages/ReactPractice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="react-mcq" element={<ReactMcq />} />
          <Route path="react-practice" element={<ReactPractice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
