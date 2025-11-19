const pool = require('../db');

exports.getAll = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM books;');

        conn.release();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching books' });
    }
};

exports.create = async (req, res) => {
    try {
        const { id, title, author, isbn, total_copies, available_copies, status } = req.body;

        if (!id || !title || !author || !isbn || !total_copies || !available_copies || !status) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const conn = await pool.getConnection();

        const existing = await conn.query('SELECT * FROM books WHERE id = ?', [id]);
        if (existing.length > 0) {
            conn.release();
            return res.status(400).json({ error: 'El id del libro ya existe' });
        }

        await conn.query(
            'INSERT INTO books(id, title, author, isbn, total_copies, available_copies, status) VALUES(?,?,?,?,?,?,?)',
            [id, title, author, isbn, total_copies, available_copies, status]
        );

        conn.release();

        res.status(201).json({
            message: 'Libro creado exitosamente',
            book: { id, title, author, isbn, total_copies, available_copies, status }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando libro' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, isbn, total_copies, available_copies, status } = req.body;

        if (!title || !author || !isbn || !total_copies || !available_copies || !status) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const conn = await pool.getConnection();

        const existing = await conn.query('SELECT * FROM books WHERE id = ?', [id]);
        if (existing.length === 0) {
            conn.release();
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        await conn.query(
            'UPDATE books SET title = ?, author = ?, isbn = ?, total_copies = ?, available_copies = ?, status = ? WHERE id = ?',
            [title, author, isbn, total_copies, available_copies, status, id]
        );

        conn.release();

        res.json({
            message: 'Libro actualizado exitosamente',
            book: { id, title, author, isbn, total_copies, available_copies, status }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error actualizando libro' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const conn = await pool.getConnection();

        const existing = await conn.query('SELECT * FROM books WHERE id = ?', [id]);
        if (existing.length === 0) {
            conn.release();
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        await conn.query('DELETE FROM books WHERE id = ?', [id]);

        conn.release();

        res.json({
            message: 'Libro eliminado exitosamente',
            id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error eliminando el libro' });
    }
};
