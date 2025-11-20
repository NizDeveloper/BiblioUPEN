import {useState, useEffect} from 'react';
import {studentService} from '../../services/studentService';
import {bookService} from '../../services/bookService';

function FormLoan({onSubmit, initialData = null}){
  const [formData, setFormData] = useState({
    student_enrollment: '',
    book_id: '',
    due_date: ''
  });

  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(()=>{
    if(initialData){
      setFormData(initialData);
    }else{
      setFormData({
        student_enrollment: '',
        book_id: '',
        due_date: ''
      });
    }
    setError('');
  }, [initialData]);

  useEffect(()=>{
    loadStudents();
    loadBooks();
  }, []);

  const loadStudents = async()=>{
    const data = await studentService.getAll();
    setStudents(data || []);
  };

  const loadBooks = async()=>{
    const data = await bookService.getAll();
    setBooks(data || []);
  };

  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.enrollment.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    book.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
    book.id.toString().includes(bookSearch)
  );

  const selectedStudent = students.find(s => s.enrollment === formData.student_enrollment);
  const selectedStudentDisplay = selectedStudent ? `${selectedStudent.name} (${selectedStudent.enrollment})` : '';

  const selectedBook = books.find(b => b.id === parseInt(formData.book_id));
  const selectedBookDisplay = selectedBook ? `${selectedBook.title} - ${selectedBook.author}` : '';

  const handleSelectStudent = (enrollment) => {
    setFormData(prev => ({...prev, student_enrollment: enrollment}));
    setShowStudentDropdown(false);
    setStudentSearch('');
  };

  const handleSelectBook = (bookId) => {
    setFormData(prev => ({...prev, book_id: bookId}));
    setShowBookDropdown(false);
    setBookSearch('');
  };

  return(
    <form>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="student_enrollment" className="form-label">STUDENT *</label>
        <select
          className="form-select"
          id="student_enrollment"
          name="student_enrollment"
          value={formData.student_enrollment}
          onChange={handleInputChange}
          disabled={initialData ? true : false}
          required
        >
          <option value="">Select a student</option>
          {students.map(student=>(
            <option key={student.enrollment} value={student.enrollment}>
              {student.name} ({student.enrollment})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="book_id" className="form-label">BOOK *</label>
        <select
          className="form-select"
          id="book_id"
          name="book_id"
          value={formData.book_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a book</option>
          {books.map(book=>(
            <option key={book.id} value={book.id}>
              {book.title} - {book.author}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="due_date" className="form-label">DUE DATE *</label>
        <input
          type="date"
          className="form-control"
          id="due_date"
          name="due_date"
          value={formData.due_date}
          onChange={handleInputChange}
          required
        />
      </div>
    </form>
  );
}

export default FormLoan;