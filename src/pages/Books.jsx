import Layout from '../components/common/Layout';
import BookList from '../components/books/BookList';

function Books() {
  return (
    <Layout>
      <div className="book-content padding-top-medium padding-bottom-medium">
        <h1 className="text-2xl font-bold text-primary "> Inventario de libros</h1>
        <p className="text -1x1 font-bold text-dark">catalogo de libros</p>
        <div className="flex items-center mt-4" >
          <input
          type="text"
          placeholder="Buscar por título, autor o ISBN..."
          className="border p-2 rounded w-full mr-4"
        />
        <button className="btn btn-primary text-white px-4 py-2 rounded shadow">
          + Nuevo Libro
        </button> 

        <BookList/>



        </div>
      </div>
    </Layout>
  );
}

export default Books;
