import Layout from '../components/common/Layout';
import BookList from '../components/books/BookList';

function Books() {
  return (
    <Layout>
      <div className="book-content padding-top-medium padding-bottom-medium">
        <h1 className="text-2xl font-bold text-primary "> Inventario de libros</h1>
        <p className="text-muted mb-4">
          Gestiona el catálogo completo de libros de la biblioteca
        </p>
        <div className="card p-3 mb-4 shadow-sm border-0" >
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              placeholder="Buscar por título, autor o ISBN..."
              className="form-control"
            />
            <button className="btn btn-primary">
              + Nuevo Libro
            </button>
          </div>

        </div>

        <div>
          <h5 className="text-success fw-bold mb-3">Listado de Libros</h5>
        <BookList/>
        </div>
      </div>
    </Layout>
  );
}

export default Books;
