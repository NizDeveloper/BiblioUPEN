import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/students">Students</Link>
        <Link to="/loans">Loans</Link>
        <Link to="/reports">Reports</Link>
      </nav>
    </aside>
  );
}
