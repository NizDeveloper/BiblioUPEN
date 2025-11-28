import { useState, useEffect, useRef } from 'react';
import { bookService } from '../services/bookService';
import Layout from '../components/common/Layout';
import ControlSection from '../components/common/ControlSection';
import BookList from '../components/books/BookList';
import FormBook from '../components/books/BookForm';
import Modal from '../components/common/Modal';
import ToastPortal from '../components/common/ToastPortal';
import BookHistoryModal from '../components/books/BookHistoryModal';

function Books(){
	const [books, setBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [bookToDelete, setBookToDelete] = useState(null);
	const [deleteConfirming, setDeleteConfirming] = useState(false);
	const [bookToEdit, setBookToEdit] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [toast, setToast] = useState(null);
	const [selectedBook, setSelectedBook] = useState(null);
	const formBookRef = useRef(null);

	useEffect(() => {
		loadBooks();
	}, []);

	const loadBooks = async() => {
		const data = await bookService.getAll();
		setBooks(data || []);
		setLoading(false);
	};

	const filteredBooks = books.filter(book => {
		if(!book) return false;
		const title = book.title ? book.title.toLowerCase(): '';
		const author = book.author ? book.author.toLowerCase(): '';
		const isbn = book.isbn ? book.isbn.toLowerCase(): '';
		const total_copies = book.total_copies ? book.total_copies.toString() : '';
		const available_copies = book.available_copies ? book.available_copies.toString() : '';
		const status = book.status ? book.status.toLowerCase(): '';
		const searchLower = searchTerm.toLowerCase();

		return title.includes(searchLower) || author.includes(searchLower) || isbn.includes(searchLower) || total_copies.includes(searchLower) || available_copies.includes(searchLower) || status.includes(searchLower);
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

	const handleHistory = (book) => {
		setSelectedBook(book);
	};

	const handleSubmitBook = async(formData) => {
		try{
			if(isEditing){
				await bookService.update(bookToEdit.isbn, formData);
				await loadBooks();

				setToast({
					message: 'Book successfully updated',
					type: 'success',
					duration: 3000
				});
			}else{
				const createData = {
					title: formData.title,
					author: formData.author,
					isbn: formData.isbn,
					total_copies: formData.total_copies,
					available_copies: formData.total_copies
				};
				await bookService.create(createData);
				await loadBooks();

				setToast({
					message: 'Book successfully added',
					type: 'success',
					duration: 3000
				});
			}
		}catch(error){
			console.error('Error:', error);
			setToast({
				message: error.message || 'Error saving book',
				type: 'error',
				duration: 4000
			});
			throw error;
		}
	};

	const handleDelete = (book) => {
		if(deleteConfirming && bookToDelete?.isbn === book.isbn){
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

	const performDelete = async(book) => {
		try{
			await bookService.delete(book.isbn);
			await loadBooks();

			setBookToDelete(null);
			setDeleteConfirming(false);

			setToast({
				message: 'Book successfully removed',
				type: 'success',
				duration: 3000
			});
		}catch(error){
			console.error('Error:', error);

			if(error.message.includes('active loan')) {
				setToast({
					message: error.message,
					type: 'warning',
					duration: 4000
				});
			} else {
				setToast({
					message: error.message || 'Error deleting book',
					type: 'error',
					duration: 4000
				});
			}

			setDeleteConfirming(false);
			setBookToDelete(null);
		}
	};

	if(loading) return <Layout><div>Loading...</div></Layout>;

	return(
		<>
			<Layout>
				<div className='book-page'>
					<h1>Book Management</h1>

					<ControlSection
						placeholder="Search by isbn or title..."
						messageButton="+ New Book"
						onSearch={handleSearch}
						onAdd={handleAddBook}
						searchValue={searchTerm}
					/>

					<div className="table-section">
						<h2 className="table-title">List of books ({books.length})</h2>

						<BookList
							books={filteredBooks}
							onEdit={handleEdit}
							onDelete={handleDelete}
							onHistory={handleHistory}
							bookToDelete={bookToDelete}
							deleteConfirming={deleteConfirming}
						/>
					</div>

					<Modal
						title={isEditing ? "Edit book" : "Add New Book"}
						onSave={handleSubmitBook}
						onClose={() => {
							setIsEditing(false);
							setBookToEdit(null);
							if(formBookRef.current) {
								formBookRef.current.resetForm();
							}
						}}>

						<FormBook ref={formBookRef} key={isEditing ? bookToEdit?.isbn : 'add'} onSubmit={handleSubmitBook} initialData={isEditing ? bookToEdit : null}/>
					</Modal>
				</div>
			</Layout>

			{selectedBook && (
				<BookHistoryModal
					bookId={selectedBook.id}
					bookTitle={selectedBook.title}
					onClose={() => setSelectedBook(null)}
				/>
			)}

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
