import { useState, useEffect } from "react";

function BookForm({onSubmit, initialData = null}) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    total_copies: '',
    available_copies: ''
  });

  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if(initialData){
			setFormData(initialData);
			setIsEditing(true);
		}else{
			setFormData({
				title: '',
				author: '',
				isbn: '',
				total_copies: '',
				available_copies: ''
			});
			setIsEditing(false);
		}
		setError('');
	}, [initialData]);

	const handleInputChange = (e) => {
		const {name, value} = e.target;

		if(name === 'isbn'){
			if(!/^\d*$/.test(value)){
				return;
			}
		}

		if(name === 'total_copies'){
			const numValue = parseInt(value);
			if(value !== '' && numValue < 0){
				return;
			}
			if(isEditing){
				setFormData(prev=>({
					...prev,
					[name]: value
				}));
			}else{
				setFormData(prev=>({
					...prev,
					total_copies: value,
					available_copies: value
				}));
			}
			setError('');
			return;
		}

		setFormData(prev=>({
			...prev,
			[name]: value
		}));
		setError('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if(!formData.title || !formData.author || !formData.isbn || !formData.total_copies){
			setError('All fields are required');
			return;
		}

		if(isEditing){
			const editData = {
				title: formData.title,
				author: formData.author,
				total_copies: formData.total_copies
			};
			onSubmit(editData);
		}else{
			onSubmit(formData);
		}
	};

	return(
		<form onSubmit={handleSubmit}>
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
					placeholder="The Lord of the Rings"
					value={formData.title}
					onChange={handleInputChange}
					maxLength="150"
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
					placeholder="J.R.R. Tolkien"
					value={formData.author}
					onChange={handleInputChange}
					maxLength="100"
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
					placeholder="9780547928227"
					value={formData.isbn}
					onChange={(e) => {
						const value = e.target.value.replace(/\D/g, '');
						const event = {target: {name: 'isbn', value}};
						handleInputChange(event);
					}}
					maxLength="20"
					disabled={isEditing}
					required
				/>
				{isEditing && (
					<small className="text-muted">ISBN cannot be changed after creation</small>
				)}
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

			{isEditing && (
				<div className="mb-3">
					<label htmlFor="available_copies" className="form-label">AVAILABLE COPIES</label>
					<input
						type="number"
						className="form-control"
						id="available_copies"
						name="available_copies"
						value={formData.available_copies}
						disabled
						readOnly
					/>
					<small className="text-muted">Calculated automatically</small>
				</div>
			)}
		</form>
	);
}

export default BookForm;
