import { useState, useEffect } from 'react';
import { ReactComponent as BookIcon } from "../../assets/images/icons/book.svg";
import { ReactComponent as BookLoanIcon } from "../../assets/images/icons/book-loan.svg";
import { ReactComponent as GroupIcon } from "../../assets/images/icons/group.svg";
import { ReactComponent as WarningIcon } from "../../assets/images/icons/warnign.svg";

function Cards(){
  const [stats, setStats] = useState({
    totalBooks: 0,
    booksOnLoan: 0,
    totalStudents: 0,
    overdueLoans: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [booksRes, studentsRes, loansRes] = await Promise.all([
        fetch('http://localhost:3001/api/books'),
        fetch('http://localhost:3001/api/students'),
        fetch('http://localhost:3001/api/loans')
      ]);

      const books = await booksRes.json();
      const students = await studentsRes.json();
      const loans = await loansRes.json();

      const totalBooks = books.length;
      const activeLoans = loans.filter(l => l.status === 'Active' || l.status === 'Overdue');
      const booksOnLoan = activeLoans.length;
      const totalStudents = students.length;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const overdueLoans = loans.filter(l => {
        if(l.status !== 'Active' && l.status !== 'Overdue') return false;
        const dueDate = new Date(l.due_date);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today;
      }).length;

      setStats({
        totalBooks,
        booksOnLoan,
        totalStudents,
        overdueLoans
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading stats:', error);
      setLoading(false);
    }
  };

  if(loading) return <div>Loading...</div>;

  return(
    <div className="cards-container">
      <div className="card-item">
        <div className="card-content">
          <div className="card-icon">
            <BookIcon/>
          </div>

          <div className="card-text">
            <span className="title">TOTAL BOOKS</span>
            <span className="info">{stats.totalBooks}</span>
            <span className="text">Library inventory</span>
          </div>
        </div>
      </div>

      <div className="card-item">
        <div className="card-content">
          <div className="card-icon">
            <BookLoanIcon/>
          </div>

          <div className="card-text">
            <span className="title">BOOKS ON LOAN</span>
            <span className="info">{stats.booksOnLoan}</span>
            <span className="text">Currently borrowed</span>
          </div>
        </div>
      </div>

      <div className="card-item">
        <div className="card-content">  
          <div className="card-icon">
            <GroupIcon/>
          </div>

          <div className="card-text">
            <span className="title">TOTAL STUDENTS</span>
            <span className="info">{stats.totalStudents}</span>
            <span className="text">Active students</span>
          </div>
        </div>
      </div>

      <div className="card-item warning">
        <div className="card-content">
          <div className="card-icon">
            <WarningIcon/>
          </div>

          <div className="card-text">
            <span className="title">OVERDUE LOANS</span>
            <span className="info">{stats.overdueLoans}</span>
            <span className="text">Requires Attention</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;