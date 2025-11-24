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
    const {title, author, isbn, total_copies, available_copies, status}= req.body;

    if(!title || !author || !isbn || !total_copies || !available_copies || !status){
      return res.status(400).json({error: 'All fields are required'})
    }

    const conn = await pool.getConnection();
    const existing = await conn.query('SELECT * FROM books WHERE isbn = ?', [isbn]);
    if(existing.length > 0){
      conn.release();
      return res.status(400).json({error: 'THE ISBN ALREADY EXISTS (try with another isbn)'});
    }

    const result = await conn.query(
      'INSERT INTO books (title, author, isbn, total_copies, available_copies, status) VALUES(?, ?, ?, ?, ?, ?)',
      [title, author, isbn, total_copies, available_copies, status]
    );

    conn.release();

    res.status(201).json({
      message: 'Book successfully created',
      book: {title, author, isbn, total_copies, available_copies, status}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error creating the book'});
  }
};

exports.update = async(req, res) => {
  try{
    const {isbn} = req.params;
    const {title, author, total_copies, available_copies, status} = req.body;

    if(!isbn){
      return res.status(400).json({error: 'ISBN REQUIRED'});
    }

    if(!title || !author || !total_copies || !available_copies || !status){
      return res.status(400).json({error: 'All fields are required'});
    }

    const conn = await pool.getConnection();  

    const existing = await conn.query('SELECT * FROM books WHERE isbn = ?', [isbn]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'COULD NOT FIND THE BOOK'});
    }

    await conn.query(
      'UPDATE books SET title = ?, author = ?, total_copies = ?, available_copies = ?, status = ? WHERE isbn = ?', 
      [title, author, total_copies, available_copies, status, isbn]
    );

    conn.release();

    res.json({
      message: 'Book successfully updated',
      book: {title, author, isbn, total_copies, available_copies, status}
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

    const existing = await conn.query('SELECT * FROM books WHERE isbn = ?', [isbn]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'COULD NOT FIND THE BOOK'});
    }

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