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
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error fetching loans'});
  }
};

exports.getByStudent = async(req, res) => {
  try{
    const {enrollment} = req.params;
    
    if(!enrollment){
      return res.status(400).json({error: 'Matrícula requerida'});
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
      return res.status(400).json({error: 'Matrícula y ID del libro son requeridos'});
    }

    const conn = await pool.getConnection();
    
    const student = await conn.query('SELECT * FROM students WHERE enrollment = ?', [student_enrollment]);
    if(student.length === 0){
      conn.release();
      return res.status(404).json({error: 'Estudiante no encontrado'});
    }

    const book = await conn.query('SELECT * FROM books WHERE id = ?', [book_id]);
    if(book.length === 0){
      conn.release();
      return res.status(404).json({error: 'Libro no encontrado'});
    }

    if(book[0].available_copies <= 0){
      conn.release();
      return res.status(400).json({error: 'No hay copias disponibles del libro'});
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
      message: 'Préstamo creado exitosamente',
      loan: {student_enrollment, book_id, loan_date: loanDate, due_date, status: 'Active'}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error creando préstamo'});
  }
};

exports.returnBook = async(req, res)=>{
  try{
    const {id} = req.params;

    if(!id){
      return res.status(400).json({error: 'ID del préstamo requerido'});
    }

    const conn = await pool.getConnection();
    
    const loan = await conn.query('SELECT * FROM loans WHERE id = ?', [id]);
    if(loan.length === 0){
      conn.release();
      return res.status(404).json({error: 'Préstamo no encontrado'});
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
      message: 'Libro devuelto exitosamente',
      return_date: returnDate
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error devolviendo libro'});
  }
};