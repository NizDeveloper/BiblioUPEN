const pool = require('../db');

exports.getAll = async(req, res) => {
  try{
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM students');
    conn.release();
    res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error fetching students'});
  }
};

exports.create = async(req, res) => {
  try{
    const {enrollment, name, email, phone, career, status} = req.body;

    if(!enrollment || !name || !email || !phone || !career || !status){
      return res.status(400).json({error: 'All fields are required'});
    }

    const conn = await pool.getConnection();
    
    const existing = await conn.query('SELECT * FROM students WHERE enrollment = ?', [enrollment]);
    if(existing.length > 0){
      conn.release();
      return res.status(400).json({error: 'Enrollment already exists'});
    }

    const result = await conn.query(
      'INSERT INTO students (enrollment, name, email, phone, career, status) VALUES (?, ?, ?, ?, ?, ?)',
      [enrollment, name, email, phone, career, status]
    );

    conn.release();

    res.status(201).json({
      message: 'Student successfully created',
      student: {enrollment, name, email, phone, career, status}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error creating student'});
  }
};

exports.update = async(req, res) => {
  try{
    const {enrollment} = req.params;
    const {name, email, phone, career, status} = req.body;

    if(!enrollment){
      return res.status(400).json({error: 'Enrollment required'});
    }

    if(!name || !email || !phone || !career || !status){
      return res.status(400).json({error: 'All fields are required'});
    }

    const conn = await pool.getConnection();
    
    const existing = await conn.query('SELECT * FROM students WHERE enrollment = ?', [enrollment]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'Student not found'});
    }

    await conn.query(
      'UPDATE students SET name = ?, email = ?, phone = ?, career = ?, status = ? WHERE enrollment = ?',
      [name, email, phone, career, status, enrollment]
    );

    conn.release();

    res.json({
      message: 'Student successfully updated',
      student: {enrollment, name, email, phone, career, status}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error updating student'});
  }
};

exports.delete = async(req, res) => {
  try{
    const {enrollment} = req.params;

    if(!enrollment){
      return res.status(400).json({error: 'Enrollment required'});
    }

    const conn = await pool.getConnection();
    
    const existing = await conn.query('SELECT * FROM students WHERE enrollment = ?', [enrollment]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'Student not found'});
    }

    const activeLoans = await conn.query(
      'SELECT COUNT(*) as count FROM loans WHERE student_enrollment = ? AND (status = "Active" OR status = "Overdue")',
      [enrollment]
    );

    const activeLoansCount = Number(activeLoans[0].count);
    
    if(activeLoansCount > 0){
      conn.release();
      return res.status(400).json({
        error: `Cannot delete student. There are ${activeLoansCount} active loan(s). Please return all books first.`
      });
    }

    await conn.query('DELETE FROM loans WHERE student_enrollment = ?', [enrollment]);
    await conn.query('DELETE FROM students WHERE enrollment = ?', [enrollment]);

    conn.release();

    res.json({
      message: 'Student successfully removed',
      enrollment
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error deleting student'});
  }
};