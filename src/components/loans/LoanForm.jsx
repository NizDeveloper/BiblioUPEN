import {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import {studentService} from '../../services/studentService';
import {bookService} from '../../services/bookService';

const FormLoan = forwardRef(({onSubmit, initialData = null}, ref) => {
  const [formData, setFormData] = useState({
    student_enrollment: '',
    book_id: '',
    due_date: ''
  });

  const resetForm = () => {
    setFormData({
      student_enrollment: '',
      book_id: '',
      due_date: ''
    });
    setStudentSearch('');
    setBookSearch('');
    setShowStudentList(false);
    setShowBookList(false);
  };

  useImperativeHandle(ref, () => ({
    resetForm,
    getFormData: () => {
      if (!formData.student_enrollment || !formData.book_id || !formData.due_date) {
        throw new Error('Registration and book ID are required');
      }
      return {
        student_enrollment: formData.student_enrollment,
        book_id: parseInt(formData.book_id),
        due_date: formData.due_date
      };
    }
  }));

  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const [studentSearch, setStudentSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [showStudentList, setShowStudentList] = useState(false);
  const [showBookList, setShowBookList] = useState(false);

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

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.enrollment.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    book.author.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const selectedStudent = students.find(s => s.enrollment === formData.student_enrollment);
  const selectedBook = books.find(b => b.id === parseInt(formData.book_id));

  const handleStudentChange = (e) => {
    setStudentSearch(e.target.value);
    setShowStudentList(true);
    setShowBookList(false);
  };

  const handleSelectStudent = (enrollment) => {
    setFormData(prev => ({...prev, student_enrollment: enrollment}));
    setStudentSearch('');
    setShowStudentList(false);
  };

  const handleBookChange = (e) => {
    setBookSearch(e.target.value);
    setShowBookList(true);
    setShowStudentList(false);
  };

  const handleSelectBook = (bookId) => {
    setFormData(prev => ({...prev, book_id: bookId}));
    setBookSearch('');
    setShowBookList(false);
  };

  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]: value
    }));
    setError('');
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
        <div className="search-wrapper">
          <input
            type="text"
            className="form-control"
            id="student_enrollment"
            name="student_enrollment"
            placeholder="Search student by name or enrollment..."
            value={selectedStudent && !showStudentList ? `${selectedStudent.name} (${selectedStudent.enrollment})` : studentSearch}
            onChange={handleStudentChange}
            onFocus={() => setShowStudentList(true)}
            onBlur={() => setTimeout(() => setShowStudentList(false), 200)}
            data-value={formData.student_enrollment}
            disabled={initialData ? true : false}
            required
          />
          {showStudentList && (
            <div className="dropdown-results">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <div
                    key={student.enrollment}
                    className="dropdown-item"
                    onClick={() => handleSelectStudent(student.enrollment)}
                  >
                    <div className="item-name">{student.name}</div>
                    <div className="item-meta">{student.enrollment}</div>
                  </div>
                ))
              ) : (
                <div className="dropdown-item--empty">No students found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="book_id" className="form-label">BOOK *</label>
        <div className="search-wrapper">
          <input
            type="text"
            className="form-control"
            id="book_id"
            name="book_id"
            placeholder="Search book by title or author..."
            value={selectedBook && !showBookList ? `${selectedBook.title} - ${selectedBook.author}` : bookSearch}
            onChange={handleBookChange}
            onFocus={() => setShowBookList(true)}
            onBlur={() => setTimeout(() => setShowBookList(false), 200)}
            data-value={formData.book_id}
            required
          />
          {showBookList && (
            <div className="dropdown-results">
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <div
                    key={book.id}
                    className="dropdown-item"
                    onClick={() => handleSelectBook(book.id)}
                  >
                    <div className="item-name">{book.title}</div>
                    <div className="item-meta">{book.author}</div>
                  </div>
                ))
              ) : (
                <div className="dropdown-item--empty">No books found</div>
              )}
            </div>
          )}
        </div>
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
});

export default FormLoan;
