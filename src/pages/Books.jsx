import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import BookList from '../components/books/BookList';
import ControlSection from '../components/common/ControlSection';
import { bookService } from '../services/bookService';

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await bookService.getAll();
      console.log('Datos recibidos: ', data);
      setBooks (data || []);
      setLoading(false);  
    };
    loadBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    if (!book) return false;
    const title = book.title ? book.title.toLowerCase() : '';
    const id = book.id ? String(book.id).toLowerCase() : '';
    return title.includes(searchTerm.toLowerCase()) || id.includes(searchTerm.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddBook = () => {
    console.log('Agregar nuevo libro');
  };

  const handleEdit = (book) => {
    console.log('Editar:', book);
  };

  const handleDelete = async (book) => {
    if (window.confirm(`¿Estás seguro de eliminar "${book.title}"?`)) {
      try {
        await bookService.delete(book.id);
        // Actualiza el estado solo si la eliminación fue exitosa
        setBooks(books.filter(b => b.id !== book.id));
        console.log('Libro eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el libro');
      }
    }
  };

  if (loading) return <Layout><div>Cargando...</div></Layout>


  return (
    <Layout>
      <div className='book-page'>
        <h1>Inventario de libros</h1>
        <ControlSection
          placeholder={"Buscar por titulo o id..."}
          messageButton={"+ Nuevo libro"}
          onSearch={handleSearch}
          onAdd={handleAddBook}
          searchValue={searchTerm}
        />

        <div className='table-section'>
          <h2 className='table-title'>Catalogo de libros ({books.length})</h2>

          <BookList
            books={filteredBooks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Books;
