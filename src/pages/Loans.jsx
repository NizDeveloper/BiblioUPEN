import Layout from '../components/common/Layout';
import LoanList from '../components/loans/LoanList';

function Loans() {
  return (
    <Layout>
      <div className="loan-page">
        <h1>Loans</h1>

        <div className="control-section">
          <div className="search-box">
            <input className="form-" type="text" placeholder="Buscar por Nombre..." id="searchInput"/>
          </div>

          <button className="btn-add" id="add-button">
            + Añadir Prestamo
          </button>
        </div>

        <div className="table-section">
          <h2 className="table-title">Listado de Prestamos</h2>

          <LoanList/>
        </div>
      </div>
    </Layout>
  );
}

export default Loans;
