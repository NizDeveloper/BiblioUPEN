import { useState, useEffect } from "react";

function FormBook({onSubmit, initialData = null}) {
  const [formData, setFormData] = useState({
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
				<label htmlFor="title" className="form-label">TITLE *</label>
				<input
					type="text"
					className="form-control"
					id="title"
					name="title"
					placeholder="Ej: Déspues"
					value={formData.title}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="author" className="form-label">AUTHOR *</label>
				<input
					type="text"
					className="form-control"
					id="author"
					name="author"
					placeholder="Ej: STEPHEN KING"
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
					placeholder="864326796"
					value={formData.isbn}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="total_copies" className="form-label">TOTAL COPIES *</label>
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
				<label htmlFor="available_copies" className="form-label">AVAILABLE COPIES *</label>
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
				<label htmlFor="status" className="form-label">STATUS *</label>
				<select
					className="form-select"
					id="status"
					name="status"
					value={formData.status}
					onChange={handleInputChange}
					required
				>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
					<option value="Suspended">Suspended</option>
				</select>
			</div>
		</form>
	);
}

export default FormBook;
