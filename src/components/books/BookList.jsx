function BookList(){
  return(
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Autor</th>
            <th scope="col">ISBN</th>
            <th scope="col">Copias totales</th>
            <th scope="col">Diponibles</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">SAS</th>
            <td>Mark</td>
            <td>9780274839</td>
            <td>8</td>
            <td>6</td>
            <td>disponible</td>
            <td>Editar, historial, eliminar</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>John</td>
            <td>Doe</td>
            <td>@social</td>
          </tr>
        </tbody>   
      </table>
    </div>
  );
}

export default BookList;