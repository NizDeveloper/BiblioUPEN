const pool = require('../db');

exports.getAll = async (req, res) => {
	try {
		const conn = await pool.getConnection();
		const result = await conn.query('SELECT * FROM books;')

		conn.release();
		res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching books'})
	}
};

// Corregido: deleteBook (no deletBook) y usando pool
exports.deleteBook = async (req, res) => {
	try {
		const {id} = req.params;
		const conn = await pool.getConnection();
		const result = await conn.query('DELETE FROM books WHERE id = ?', [id]);
		
		conn.release();
		
		if (result.affectedRows === 0) {
		return res.status(404).json({ message: 'Libro no encontrado' });
		}
		res.json({ message: 'Libro eliminado correctamente' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};
