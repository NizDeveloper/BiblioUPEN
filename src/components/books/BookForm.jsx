import { useState, useEffect } from "react";

function FormBook({ onSubmit, initialData = null}) {
	const [formData, setFormData] = useState({
		id: '',
		title: '',
		author: '',
		isbn: '',
		total_copies: '',
		available_copies: '',
		status: 'Active'
	});

	const [error, setError] = useState('');

	useEffect(() => {
		if(initialData){
			setFormData(initialData);
		}else{
			setFormData({
				id: '',
				title: '',
				author: '',
				isbn: '',
				total_copies: '',
				available_copies: '',
				status: 'Active'
			});
		}
		setError('');
	}, [initialData]);

	const handleInputChange = (e) => {
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
				<label htmlFor="id" className="form-label">LIBRO_ID *</label>
				<input
					type="text"
					className="form-control"
					id="id"
					name="id"
					placeholder="Ej: 763658"
					value={formData.id}
					onChange={handleInputChange}
					disabled={initialData ? true : false}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="title" className="form-label">TITULO DEL LIBRO *</label>
				<input 
					type="text"
					className="form-control"
					id="title"
					name="title"
					placeholder="Ej: DÉSPUES"
					value={formData.title}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="nm-3">
				<label htmlFor="author" className="form-label">NOMBRE DEL AUTOR *</label>
				<input 
					type="text"
					className="form-control"					
					id="author"
					name="author"
					placeholder="Ej: Stephen king"
					value={formData.author}
					onChange={handleInputChange}
					required	
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="isbn" className="form-label">ISBN *</label>
				<input 
					type="text"
					className="form-control"
					id="isbn"
					name="isbn"
					placeholder="Ej: 874892948"
					value={formData.isbn}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="total_copies" className="form-label">COPIAS TOTALES *</label>
				<input
					type="number"
					className="form-control"
					id="total_copies"
					name="total_copies"
					value={formData.total_copies}
					onChange={handleInputChange}
					required
				/>
			</div>
			
			<div className="mb-3">
				<label htmlFor="avialble_copies" className="form-label">COPIAS DISPONIBLES *</label>
				<input 
					type="number"
					className="form-control"
					id="available_copies"
					name="available_copies"
					value={formData.available_copies}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="mb-3">
        <label htmlFor="status" className="form-label">ESTADO *</label>
        <select
					className="form-select"
					id="status"
					name="status"
					value={formData.status}
					onChange={handleInputChange}
					required
        >
        <option value="Active">Activo</option>
    	<option value="Inactive">Inactivo</option>
        <option value="Suspended">Suspendido</option>
        </select>
			</div>
		</form>
	);
}

export default FormBook;