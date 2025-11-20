import {useState} from 'react';
import Table from '../common/Table';

function LoanList({loans, onReturn}){
  const [loanToReturn, setLoanToReturn] = useState(null);
  const [confirmingReturn, setConfirmingReturn] = useState(false);

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

  const handleReturnClick = (loan)=>{
    setLoanToReturn(loan);
    setConfirmingReturn(true);

    setTimeout(()=>{
      setConfirmingReturn(false);
      setLoanToReturn(null);
    }, 5000);
  };

  const handleConfirmReturn = (loan)=>{
    if(confirmingReturn && loanToReturn?.id === loan.id){
      onReturn(loan);
      setConfirmingReturn(false);
      setLoanToReturn(null);
    }
  };

  const columns = [
    {key: 'title', label: 'BOOK'},
    {key: 'author', label: 'AUTHOR'},
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
      render: (status)=>(
        <span className={`badge badge-${status.toLowerCase()}`}>
          {status}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: (loan)=>{
        if(confirmingReturn && loanToReturn?.id === loan.id){
          return '¿Confirm?';
        }
        return loan.status === 'Active' ? 'Return' : 'Returned';
      },
      type: (loan)=>loan.status === 'Active' ? 'success' : 'secondary',
      onClick: (loan)=>{
        if(loan.status === 'Active'){
          if(confirmingReturn && loanToReturn?.id === loan.id){
            handleConfirmReturn(loan);
          }else{
            handleReturnClick(loan);
          }
        }
      }
    }
  ];

  return(
    <Table columns={columns} data={loans} actions={actions}/>
  );
}

export default LoanList;