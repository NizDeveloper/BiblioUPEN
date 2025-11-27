import {useState} from 'react';
import Table from '../common/Table';

function LoanList({loans, onReturn, onExtend, onDelete, loanToDelete, deleteConfirming}){
  const [loanToReturn, setLoanToReturn] = useState(null);
  const [confirmingReturn, setConfirmingReturn] = useState(false);
  const [extendingLoan, setExtendingLoan] = useState(null);
  const [newDueDate, setNewDueDate] = useState('');

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

  const handleReturnClick = (loan) => {
    setLoanToReturn(loan);
    setConfirmingReturn(true);

    setTimeout(()=>{
      setConfirmingReturn(false);
      setLoanToReturn(null);
    }, 5000);
  };

  const handleConfirmReturn = (loan) => {
    if(confirmingReturn && loanToReturn?.id === loan.id){
      onReturn(loan);
      setConfirmingReturn(false);
      setLoanToReturn(null);
    }
  };

  const handleExtendClick = (loan) => {
    setExtendingLoan(loan);
    const today = new Date().toISOString().split('T')[0];
    setNewDueDate(today);
  };

  const handleConfirmExtend = async (loan) => {
    if(newDueDate && extendingLoan?.id === loan.id){
      await onExtend(loan, newDueDate);
      setExtendingLoan(null);
      setNewDueDate('');
    }
  };

  const handleCancelExtend = () => {
    setExtendingLoan(null);
    setNewDueDate('');
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const columns = [
    {key: 'title', label: 'BOOK'},
    {key: 'student_name', label: 'STUDENT'},
    {
      key: 'loan_date',
      label: 'LOAN DATE',
      render: (date) => formatDate(date)
    },
    {
      key: 'due_date',
      label: 'DUE DATE',
      render: (date) => formatDate(date)
    },
    {
      key: 'status',
      label: 'STATUS',
      render: (status)=>{
        let badgeClass = `badge-${status.toLowerCase()}`;
        let displayStatus = status;

        if(status === 'Overdue'){
          badgeClass = 'badge-danger';
          displayStatus = 'Overdue';
        }

        return (
          <span className={`badge ${badgeClass}`}>
            {displayStatus}
          </span>
        );
      }
    }
  ];

  const actions = [
    {
      label: (loan)=>{
        if(confirmingReturn && loanToReturn?.id === loan.id){
          return '¿Confirm?';
        }
        if(extendingLoan?.id === loan.id){
          return 'Extending...';
        }
        if(loan.status === 'Active' || loan.status === 'Overdue'){
          return 'Return';
        }
        return 'Returned';
      },
      type: (loan)=> (loan.status === 'Active' || loan.status === 'Overdue') ? 'success' : 'secondary',
      onClick: (loan)=>{
        if(loan.status === 'Active' || loan.status === 'Overdue'){
          if(confirmingReturn && loanToReturn?.id === loan.id){
            handleConfirmReturn(loan);
          }else{
            handleReturnClick(loan);
          }
        }
      }
    },
    {
      label: (loan) => (loan.status === 'Active' || loan.status === 'Overdue') ? 'Extend' : '',
      type: 'info',
      onClick: (loan) => {
        if(loan.status === 'Active' || loan.status === 'Overdue'){
          handleExtendClick(loan);
        }
      },
      hidden: (loan) => loan.status !== 'Active' && loan.status !== 'Overdue'
    },
    {
      label: (loan) => {
        if(deleteConfirming && loanToDelete?.id === loan.id){
          return 'Confirm?';
        }
        return 'Delete';
      },
      type: 'danger',
      onClick: (loan) => onDelete(loan)
    }
  ];

  return(
    <>
      <Table columns={columns} data={loans} actions={actions}/>

      {extendingLoan && (
        <div className="modal-overlay" onClick={handleCancelExtend}>
          <div className="extend-modal" onClick={(e) => e.stopPropagation()}>
            <div className="extend-modal__header">
              <h3>Extend Due Date</h3>
              <button className="extend-modal__close" onClick={handleCancelExtend}>×</button>
            </div>
            <div className="extend-modal__body">
              <p className="extend-modal__info">
                <strong>Book:</strong> {extendingLoan.title}
              </p>
              <p className="extend-modal__info">
                <strong>Current Due Date:</strong> {formatDate(extendingLoan.due_date)}
              </p>
              <div className="extend-modal__form-group">
                <label htmlFor="new_due_date">New Due Date *</label>
                <input
                  type="date"
                  id="new_due_date"
                  className="form-control"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="extend-modal__footer">
              <button
                className="btn btn-secondary"
                onClick={handleCancelExtend}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleConfirmExtend(extendingLoan)}
                disabled={!newDueDate}
              >
                Extend
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoanList;