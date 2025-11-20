import {useState, useEffect} from 'react';
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

  useEffect(()=>{
    loadLoans();
  }, []);

  const loadLoans = async()=>{
    const data = await loanService.getAll();
    setLoans(data || []);
    setLoading(false);
  };

  const filteredLoans = loans.filter(loan=>{
    if(!loan)return false;
    
    const studentName = loan.student_name ? loan.student_name.toLowerCase() : '';
    const title = loan.title ? loan.title.toLowerCase() : '';
    const author = loan.author ? loan.author.toLowerCase() : '';
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = studentName.includes(searchLower) || title.includes(searchLower) || author.includes(searchLower);
    
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' && loan.status === 'Active') ||(filterStatus === 'returned' && loan.status === 'Returned');
    
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

  const handleSubmitLoan = async(formData)=>{
    try{
      await loanService.create(formData);
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

  const activeCount = loans.filter(l => l.status === 'Active').length;
  const returnedCount = loans.filter(l => l.status === 'Returned').length;

  if(loading)return <Layout><div>Loading...</div></Layout>;

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

          {/* Filtros por estado */}
          <div className="filter-buttons-container">
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'filter-btn--active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              <span className="filter-btn__label">All</span>
              <span className="filter-btn__count">{loans.length}</span>
            </button>
            <button
              className={`filter-btn filter-btn--success ${filterStatus === 'active' ? 'filter-btn--active' : ''}`}
              onClick={() => setFilterStatus('active')}
            >
              <span className="filter-btn__label">Active</span>
              <span className="filter-btn__count">{activeCount}</span>
            </button>
            <button
              className={`filter-btn filter-btn--info ${filterStatus === 'returned' ? 'filter-btn--active' : ''}`}
              onClick={() => setFilterStatus('returned')}
            >
              <span className="filter-btn__label">Returned</span>
              <span className="filter-btn__count">{returnedCount}</span>
            </button>
          </div>

          <div className="table-section">
            <h2 className="table-title">Loans ({filteredLoans.length})</h2>

            <LoanList
              loans={filteredLoans}
              onReturn={handleReturn}
            />
          </div>

          <Modal
            title="Create New Loan"
            onSave={handleSubmitLoan}
            onClose={()=>{}}>

            <FormLoan onSubmit={handleSubmitLoan}/>
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