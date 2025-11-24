const pool = require('../db');

exports.getAll = async(req, res) => {
  try{
    const conn = await pool.getConnection();
    const result = await conn.query(`
      SELECT l.*, b.title, b.author, s.name as student_name
      FROM loans l
      LEFT JOIN books b ON l.book_id = b.id
      LEFT JOIN students s ON l.student_enrollment = s.enrollment
      ORDER BY l.loan_date DESC
    `);
    conn.release();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    const loansWithStatus = result.map(loan => {
      const loanCopy = {...loan};

      if(loanCopy.status === 'Active'){
        const dueDate = new Date(loanCopy.due_date);
        dueDate.setHours(0, 0, 0, 0);
        const dueDateTime = dueDate.getTime();

        if(dueDateTime < todayTime){
          loanCopy.status = 'Overdue';
        }
      }
      return loanCopy;
    });

    res.json(loansWithStatus);
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error fetching loans'});
  }
};

exports.getByStudent = async(req, res) => {
  try{
    const {enrollment} = req.params;

    if(!enrollment){
      return res.status(400).json({error: 'Enrollment required'});
    }

    const conn = await pool.getConnection();
    const result = await conn.query(`
      SELECT l.*, b.title, b.author, b.isbn
      FROM loans l
      LEFT JOIN books b ON l.book_id = b.id
      WHERE l.student_enrollment = ?
      ORDER BY l.loan_date DESC
    `, [enrollment]);
    conn.release();
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error fetching student loans'});
  }
};

exports.create = async(req, res) => {
  try{
    const {student_enrollment, book_id, due_date} = req.body;

    if(!student_enrollment || !book_id){
      return res.status(400).json({error: 'Registration and book ID are required.'});
    }

    const conn = await pool.getConnection();

    const student = await conn.query('SELECT * FROM students WHERE enrollment = ?', [student_enrollment]);
    if(student.length === 0){
      conn.release();
      return res.status(404).json({error: 'Student not found'});
    }

    const book = await conn.query('SELECT * FROM books WHERE id = ?', [book_id]);
    if(book.length === 0){
      conn.release();
      return res.status(404).json({error: 'Book not found'});
    }

    if(book[0].available_copies <= 0){
      conn.release();
      return res.status(400).json({error: 'No copies of the book are available.'});
    }

    const loanDate = new Date().toISOString().split('T')[0];
    await conn.query(
      'INSERT INTO loans (student_enrollment, book_id, loan_date, due_date, status) VALUES (?, ?, ?, ?, ?)',
      [student_enrollment, book_id, loanDate, due_date, 'Active']
    );

    await conn.query(
      'UPDATE books SET available_copies = available_copies - 1 WHERE id = ?',
      [book_id]
    );

    conn.release();

    res.status(201).json({
      message: 'Loan successfully created',
      loan: {student_enrollment, book_id, loan_date: loanDate, due_date, status: 'Active'}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error creating loan'});
  }
};

exports.returnBook = async(req, res) => {
  try{
    const {id} = req.params;

    if(!id){
      return res.status(400).json({error: 'Required loan ID'});
    }

    const conn = await pool.getConnection();

    const loan = await conn.query('SELECT * FROM loans WHERE id = ?', [id]);
    if(loan.length === 0){
      conn.release();
      return res.status(404).json({error: 'Loan not found'});
    }

    const returnDate = new Date().toISOString().split('T')[0];
    await conn.query(
      'UPDATE loans SET return_date = ?, status = ? WHERE id = ?',
      [returnDate, 'Returned', id]
    );

    await conn.query(
      'UPDATE books SET available_copies = available_copies + 1 WHERE id = ?',
      [loan[0].book_id]
    );

    conn.release();

    res.json({
      message: 'Book successfully returned',
      return_date: returnDate
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error returning book'});
  }
};

exports.extendDueDate = async(req, res) => {
  try{
    const {id} = req.params;
    const {due_date} = req.body;

    if(!id || !due_date){
      return res.status(400).json({error: 'Loan ID and date are required'});
    }

    const conn = await pool.getConnection();

    const loan = await conn.query('SELECT * FROM loans WHERE id = ?', [id]);
    if(loan.length === 0){
      conn.release();
      return res.status(404).json({error: 'Loan not found'});
    }

    await conn.query(
      'UPDATE loans SET due_date = ? WHERE id = ?',
      [due_date, id]
    );

    conn.release();

    res.json({
      message: 'Expiration date successfully extended',
      due_date: due_date
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error extending date'});
  }
};
