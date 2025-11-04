import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Students from './pages/Students';
import Loans from './pages/Loans';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/students" element={<Students/> } />
        <Route path="/loans" element={<Loans/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
