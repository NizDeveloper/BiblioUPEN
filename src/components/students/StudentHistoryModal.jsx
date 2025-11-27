import {useState, useEffect} from 'react';
import {loanService} from '../../services/loanService';

function StudentHistoryModal({enrollment, studentName, onClose}){
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    loadStudentLoans();
  }, [enrollment]);

  const loadStudentLoans = async()=>{
    try{
      const data = await loanService.getByStudent(enrollment);
      setLoans(data || []);
      setLoading(false);
    }catch(error){
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header bg-primary text-white">
          <h5>Loan History - {studentName}</h5>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {loading ? (
            <div>Loading...</div>
          ) : loans.length > 0 ? (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>BOOK</th>
                  <th>LOAN DATE</th>
                  <th>DUE DATE</th>
                  <th>RETURN DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, idx) => (
                  <tr key={idx}>
                    <td>{loan.title}</td>
                    <td>{formatDate(loan.loan_date)}</td>
                    <td>{formatDate(loan.due_date)}</td>
                    <td>{formatDate(loan.return_date)}</td>
                    <td><span className={`badge badge-${loan.status.toLowerCase()}`}>{loan.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No loans found</div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default StudentHistoryModal;
