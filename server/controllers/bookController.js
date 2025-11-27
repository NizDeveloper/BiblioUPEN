const pool = require('../db');

exports.getAll = async (req, res) => {
  try{
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM books');
    conn.release();
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error fetching books'});
  }
};

exports.create = async(req, res) => {
  try{
    const {title, author, isbn, total_copies, available_copies}= req.body;

    if(!title || !author || !isbn || !total_copies || !available_copies){
      return res.status(400).json({error: 'All fields are required'})
    }

    const conn = await pool.getConnection();
    const existing = await conn.query('SELECT * FROM books WHERE isbn = ?', [isbn]);
    if(existing.length > 0){
      conn.release();
      return res.status(400).json({error: 'THE ISBN ALREADY EXISTS (try with another isbn)'});
    }

    const result = await conn.query(
      'INSERT INTO books (title, author, isbn, total_copies, available_copies, is_discontinued) VALUES(?, ?, ?, ?, ?, ?)',
      [title, author, isbn, total_copies, available_copies, false]
    );

    conn.release();

    res.status(201).json({
      message: 'Book successfully created',
      book: {title, author, isbn, total_copies, available_copies}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error creating the book'});
  }
};

exports.update = async(req, res) => {
  try{
    const {isbn} = req.params;
    const {title, author, total_copies} = req.body;

    if(!isbn){
      return res.status(400).json({error: 'ISBN REQUIRED'});
    }

    if(!title || !author || !total_copies){
      return res.status(400).json({error: 'All fields are required'});
    }

    const conn = await pool.getConnection();

    const existing = await conn.query('SELECT * FROM books WHERE isbn = ?', [isbn]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'COULD NOT FIND THE BOOK'});
    }

    const currentBook = existing[0];
    const activeLoans = await conn.query(
      'SELECT COUNT(*) as count FROM loans WHERE book_id = ? AND (status = "Active" OR status = "Overdue")',
      [currentBook.id]
    );

    const activeLoansCount = Number(activeLoans[0].count);

    if(total_copies < activeLoansCount){
      conn.release();
      return res.status(400).json({
        error: `Cannot reduce total copies to ${total_copies}. There are ${activeLoansCount} active loan(s). Minimum total copies should be ${activeLoansCount}.`
      });
    }

    const newAvailableCopies = total_copies - activeLoansCount;

    await conn.query(
      'UPDATE books SET title = ?, author = ?, total_copies = ?, available_copies = ? WHERE isbn = ?',
      [title, author, total_copies, newAvailableCopies, isbn]
    );

    conn.release();

    res.json({
      message: 'Book successfully updated',
      book: {title, author, isbn, total_copies, available_copies: newAvailableCopies}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'ERROR UPDATING BOOK'});
  }
};

exports.delete = async(req, res) => {
  try{
    const {isbn} = req.params;
    if(!isbn){
      return res.status(400).json({error: 'ISBN REQUIRED'});
    }
    const conn = await pool.getConnection();

    const existing = await conn.query('SELECT id FROM books WHERE isbn = ?', [isbn]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'COULD NOT FIND THE BOOK'});
    }

    const bookId = existing[0].id;

    const allLoans = await conn.query(
      'SELECT id, status FROM loans WHERE book_id = ?',
      [bookId]
    );

    const activeLoans = await conn.query(
      'SELECT COUNT(*) as count FROM loans WHERE book_id = ? AND (status = "Active" OR status = "Overdue")',
      [bookId]
    );

    if(activeLoans[0].count > 0){
      conn.release();
      return res.status(400).json({
        error: `Cannot delete book. There are ${activeLoans[0].count} active loan(s) associated with this book.`
      });
    }

    await conn.query('DELETE FROM loans WHERE book_id = ?', [bookId]);
    await conn.query('DELETE FROM books WHERE isbn = ?', [isbn]);
    conn.release();

    res.json({
      message: 'book successfully eliminated',
      isbn
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'ERROR DELETING BOOK'});
  }
};
