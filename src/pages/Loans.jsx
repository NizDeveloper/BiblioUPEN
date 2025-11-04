import Layout from '../components/common/Layout';
import LoanList from '../components/loans/LoanList';

function Loans() {
  return (
    <Layout>
      <div className="loan-page">
        <h1>Loans</h1>

        <div className="control-section">
          <div className="search-box">
            <input type="text" />
          </div>

          <button id="add-button">
            <div className="icon">
              +
            </div>

            <span className="text"> Añadir Prestamo</span>
          </button>
        </div>

        <div className="table-section">
          <h2 className="table-title">Listado de Estudiantes</h2>

          <LoanList/>
        </div>
      </div>
    </Layout>
  );
}

export default Loans;
