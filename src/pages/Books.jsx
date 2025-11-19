import { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
import Layout from '../components/common/Layout';
import ControlSection from '../components/common/ControlSection';
import BookList from '../components/books/BookList';
import FormBook from '../components/books/BookForm';
import Modal from '../components/common/Modal';
import ToastPortal from '../components/common/ToastPortal';

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleteConfirming, setDeleteConfirming] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);


  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async() => {
    const data = await bookService.getAll();
    console.log('Datos recibidos: ', data);
    setBooks (data || []);
    setLoading(false);
  };

  const filteredBooks = books.filter(book => {
    if (!book) return false;
    const title = book.title ? book.title.toLowerCase() : '';
    const id = book.id ? String(book.id).toLowerCase() : '';
    const author = book.author ? (book.author).toLowerCase() : '';
    const isbn = book.isbn ? (book.isbn).toLowerCase() : '';
    return title.includes(searchTerm.toLowerCase()) || 
          id.includes(searchTerm.toLowerCase()) ||
          author.includes(searchTerm.toLowerCase()) ||
          isbn.includes(searchTerm.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddBook = () => {
    setIsEditing(false);
    setBookToEdit(null);

    const modalElement = document.getElementById('modal');
    if(modalElement){
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const handleEdit = (book) => {
    setIsEditing(true);
    setBookToEdit(book);

    const modalElement = document.getElementById('modal');
    if(modalElement){
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const handleSubmitBook = async (formData) => {
    try{
      if(isEditing){
        await bookService.update(bookToEdit.id, formData);
        await loadBooks();

        setToast({
          message: 'Libro actualizado exitosamente',
          type: 'success',
          duration: 3000
        });
      }else{
        await bookService.create(formData);
        await loadBooks();

        setToast({
          message: 'Libro agregado exitosamente',
          type: 'success',
          duration: 3000
        });
      }
    }catch(error){
      console.error('Error: ', error);
      setToast({
        message: error.message || 'Error al guardar el libro',
        type: 'error',
        duration: 4000
      });
      throw error;
    }
  };

  const handleDelete = (book) => {
    if(deleteConfirming && bookToDelete?.id === book.id){
      performDelete(book);
      return;
    }

    setBookToDelete(book);
    setDeleteConfirming(true);

    setTimeout(() => {
      setDeleteConfirming(false);
      setBookToDelete(null);
    }, 5000);
  };

  const performDelete = async (book) => {
    try{
      await bookService.delete(book.id);
      await loadBooks();

      setBookToDelete(null);
      setDeleteConfirming(false);

      setToast({
        message: 'Libro eliminado exitosamente',
        type: 'success',
        duration: 3000
      });
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: 'Error al eliminar el libro',
        type: 'Error',
        duration: 4000
      });
      setDeleteConfirming(false);
      setBookToDelete(null);
    }
  };

  if(loading)return <Layout><div>Cargando...</div></Layout>;


  return (
    <>
      <Layout>
        <div className="Book-page">
          <h1>Gestion de Libros</h1>
          <ControlSection
            placeholder="Buscar por id o titulo"
            messageButton="+ Nuevo Libro"
            onSearch={handleSearch}
            onAdd={handleAddBook}
            searchValue={searchTerm}
          />

          <div className="table-section">
            <h2 className='table-title'>Lista de libros ({books.length})</h2>
            
            <BookList 
              books={filteredBooks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              bookToDelete={bookToDelete}
              deleteConfirming={deleteConfirming}
            />
          </div>

          <Modal
            title={isEditing ? "Editar libro" : "Agregar Nuevo Libro"}
            onSave={handleSubmitBook}
            onClose={() => {
              setIsEditing(false);
              setBookToEdit(null);
            }}>

              <FormBook key={isEditing ? bookToEdit?.id : 'add'} onSubmit={handleSubmitBook} initialData={isEditing? bookToEdit : null}/>
            </Modal>
        </div>
      </Layout>
      
      {toast && (
				<ToastPortal
					message={toast.message}
					type={toast.type}
					duration={toast.duration}
					onClose={() => setToast(null)}
				/>
			)}
    </>
  );
}

export default Books;
