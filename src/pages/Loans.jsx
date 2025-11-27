import {useState, useEffect, useRef} from 'react';
import {loanService} from '../services/loanService';
import Layout from '../components/common/Layout';
import ControlSection from '../components/common/ControlSection';
import Modal from '../components/common/Modal';
import LoanList from '../components/loans/LoanList';
import FormLoan from '../components/loans/LoanForm';
import ToastPortal from '../components/common/ToastPortal';

function Loans(){
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [loanToDelete, setLoanToDelete] = useState(null);
  const [deleteConfirming, setDeleteConfirming] = useState(false);
  const formLoanRef = useRef(null);

  useEffect(()=>{
    loadLoans();
  }, []);

  const loadLoans = async()=>{
    try{
      const data = await loanService.getAll();
      setLoans(data || []);
      setLoading(false);
    }catch(error){
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const filteredLoans = loans.filter(loan=>{
    if(!loan) return false;
    const studentName = loan.student_name ? loan.student_name.toLowerCase() : '';
    const title = loan.title ? loan.title.toLowerCase() : '';
    const author = loan.author ? loan.author.toLowerCase() : '';
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = studentName.includes(searchLower) || title.includes(searchLower) || author.includes(searchLower);
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' && loan.status === 'Active') || (filterStatus === 'returned' && loan.status === 'Returned') || (filterStatus === 'overdue' && loan.status === 'Overdue');
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e)=>{
    setSearchTerm(e.target.value);
  };

  const handleAddLoan = ()=>{
    const modalElement = document.getElementById('modal');
    if(modalElement){
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const handleCloseModal = ()=>{
    const modalElement = document.getElementById('modal');
    if(modalElement){
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if(modal){
        modal.hide();
        if(formLoanRef.current){
          formLoanRef.current.resetForm();
        }
      }
    }
  };

  const handleSubmitLoan = async(formData)=>{
    try{
      const studentInput = document.querySelector('input[name="student_enrollment"]');
      const bookInput = document.querySelector('input[name="book_id"]');
      const studentEnrollment = studentInput?.getAttribute('data-value') || formData.student_enrollment;
      const bookId = bookInput?.getAttribute('data-value') || formData.book_id;

      if(!studentEnrollment || !studentEnrollment.trim()){
        throw new Error('Student registration is required');
      }
      if(!bookId || !bookId.trim()){
        throw new Error('Book ID is required');
      }
      if(!formData.due_date || !formData.due_date.trim()){
        throw new Error('Expiration date is required');
      }

      const loanData = {
        student_enrollment: studentEnrollment.trim(),
        book_id: parseInt(bookId),
        due_date: formData.due_date
      };

      await loanService.create(loanData);
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadLoans();

      setToast({
        message: 'Loan created successfully',
        type: 'success',
        duration: 3000
      });
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: error.message || 'Error creating loan',
        type: 'error',
        duration: 4000
      });
      throw error;
    }
  };

  const handleReturn = async(loan)=>{
    try{
      await loanService.returnBook(loan.id);
      await loadLoans();
      setToast({
        message: 'Book returned successfully',
        type: 'success',
        duration: 3000
      });
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: 'Error returning book',
        type: 'error',
        duration: 4000
      });
    }
  };

  const handleExtend = async(loan, newDueDate)=>{
    try{
      await loanService.extendDueDate(loan.id, newDueDate);
      await loadLoans();
      setToast({
        message: 'Due date extended successfully',
        type: 'success',
        duration: 3000
      });
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: 'Error extending due date',
        type: 'error',
        duration: 4000
      });
    }
  };

  const handleDelete = (loan)=>{
    if(deleteConfirming && loanToDelete?.id === loan.id){
      performDelete(loan);
      return;
    }

    setLoanToDelete(loan);
    setDeleteConfirming(true);

    setTimeout(()=>{
      setDeleteConfirming(false);
      setLoanToDelete(null);
    }, 5000);
  };

  const performDelete = async(loan)=>{
    try{
      await loanService.delete(loan.id);
      await loadLoans();

      setLoanToDelete(null);
      setDeleteConfirming(false);

      setToast({
        message: 'Loan successfully deleted',
        type: 'success',
        duration: 3000
      });
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: error.message || 'Error deleting loan',
        type: 'error',
        duration: 4000
      });
      setDeleteConfirming(false);
      setLoanToDelete(null);
    }
  };

  const activeCount = loans.filter(l => l.status === 'Active').length;
  const returnedCount = loans.filter(l => l.status === 'Returned').length;
  const overdueCount = loans.filter(l => l.status === 'Overdue').length;

  if(loading) return <Layout><div>Loading...</div></Layout>;

  return(
    <>
      <Layout>
        <div className="loans-page">
          <h1>Loan Management</h1>
          <ControlSection
            placeholder="Search by student, book or author..."
            messageButton="+ New Loan"
            onSearch={handleSearch}
            onAdd={handleAddLoan}
            searchValue={searchTerm}
          />

          <div className="filter-buttons-container">
            <button className={`filter-btn ${filterStatus === 'all' ? 'filter-btn--active' : ''}`} onClick={() => setFilterStatus('all')}>
              <span className="filter-btn__label">All</span>
              <span className="filter-btn__count">{loans.length}</span>
            </button>
            <button className={`filter-btn filter-btn--success ${filterStatus === 'active' ? 'filter-btn--active' : ''}`} onClick={() => setFilterStatus('active')}>
              <span className="filter-btn__label">Active</span>
              <span className="filter-btn__count">{activeCount}</span>
            </button>
            <button className={`filter-btn filter-btn--info ${filterStatus === 'returned' ? 'filter-btn--active' : ''}`} onClick={() => setFilterStatus('returned')}>
              <span className="filter-btn__label">Returned</span>
              <span className="filter-btn__count">{returnedCount}</span>
            </button>
            <button className={`filter-btn filter-btn--danger ${filterStatus === 'overdue' ? 'filter-btn--active' : ''}`} onClick={() => setFilterStatus('overdue')}>
              <span className="filter-btn__label">Overdue</span>
              <span className="filter-btn__count">{overdueCount}</span>
            </button>
          </div>

          <div className="table-section">
            <h2 className="table-title">Loans ({filteredLoans.length})</h2>
            <LoanList 
              loans={filteredLoans} 
              onReturn={handleReturn} 
              onExtend={handleExtend}
              onDelete={handleDelete}
              loanToDelete={loanToDelete}
              deleteConfirming={deleteConfirming}
            />
          </div>

          <Modal title="Create New Loan" onSave={handleSubmitLoan} onClose={handleCloseModal}>
            <FormLoan ref={formLoanRef} onSubmit={handleSubmitLoan}/>
          </Modal>
        </div>
      </Layout>

      {toast && (
        <ToastPortal
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={()=>setToast(null)}
        />
      )}
    </>
  );
}

export default Loans;