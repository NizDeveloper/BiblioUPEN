import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Books from './pages/book';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/book" element={<Books/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
