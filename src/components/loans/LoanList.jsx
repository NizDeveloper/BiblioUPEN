function LoanList() {
  return(
    <div className="loan-table">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Libro</th>
            <th scope="col">Estudiante</th>
            <th scope="col">Fecha Prestamo</th>
            <th scope="col">Fecha Limite</th>
            <th scope="col">Status</th>
            <th scope="col" colSpan="2">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <th scope="row">Algoritmos Avanzados</th>
            <td>Niz Peña</td>
            <td>20/10/2025</td>
            <td>03/11/2025</td>
            <td>Activo</td>
            <td>
              <button>Registrar Devolucion</button>
            </td>
            <td>
              <button>Extender plazo</button>
            </td>
          </tr>
          <tr>
            <th scope="row">Algoritmos Avanzados</th>
            <td>Niz Peña</td>
            <td>20/10/2025</td>
            <td>03/11/2025</td>
            <td>Activo</td>
            <td>
              <button>Registrar Devolucion</button>
            </td>
            <td>
              <button>Extender plazo</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;