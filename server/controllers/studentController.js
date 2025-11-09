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
      return res.status(400).json({error: 'Todos los campos son requeridos'});
    }

    const conn = await pool.getConnection();
    
    const existing = await conn.query('SELECT * FROM students WHERE enrollment = ?', [enrollment]);
    if(existing.length > 0){
      conn.release();
      return res.status(400).json({error: 'La matrícula ya existe'});
    }

    const result = await conn.query(
      'INSERT INTO students (enrollment, name, email, phone, career, status) VALUES (?, ?, ?, ?, ?, ?)',
      [enrollment, name, email, phone, career, status]
    );

    conn.release();

    res.status(201).json({
      message: 'Estudiante creado exitosamente',
      student: {enrollment, name, email, phone, career, status}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error creando estudiante'});
  }
};

exports.update = async(req, res) => {
  try{
    const {enrollment} = req.params;
    const {name, email, phone, career, status} = req.body;

    if(!enrollment){
      return res.status(400).json({error: 'Matrícula requerida'});
    }

    if(!name || !email || !phone || !career || !status){
      return res.status(400).json({error: 'Todos los campos son requeridos'});
    }

    const conn = await pool.getConnection();
    
    const existing = await conn.query('SELECT * FROM students WHERE enrollment = ?', [enrollment]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'Estudiante no encontrado'});
    }

    await conn.query(
      'UPDATE students SET name = ?, email = ?, phone = ?, career = ?, status = ? WHERE enrollment = ?',
      [name, email, phone, career, status, enrollment]
    );

    conn.release();

    res.json({
      message: 'Estudiante actualizado exitosamente',
      student: {enrollment, name, email, phone, career, status}
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error actualizando estudiante'});
  }
};

exports.delete = async(req, res) => {
  try{
    const {enrollment} = req.params;

    if(!enrollment){
      return res.status(400).json({error: 'Matrícula requerida'});
    }

    const conn = await pool.getConnection();
    
    const existing = await conn.query('SELECT * FROM students WHERE enrollment = ?', [enrollment]);
    if(existing.length === 0){
      conn.release();
      return res.status(404).json({error: 'Estudiante no encontrado'});
    }

    await conn.query('DELETE FROM students WHERE enrollment = ?', [enrollment]);

    conn.release();

    res.json({
      message: 'Estudiante eliminado exitosamente',
      enrollment
    });
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error eliminando estudiante'});
  }
};