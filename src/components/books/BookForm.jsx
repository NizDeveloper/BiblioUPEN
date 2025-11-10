import { useState } from "react";

function FormBook({ onSubmit}) {
	const [formData, setFormData] = useState({
		id: '',
		title: '',
		author: '',
		isbn: '',
		total_copies: '',
		available_copies: '',
		status: 'Active'
	});

	const handleInputChange = (e) => {
			const { name, value } = e.target;
			setFormData(prev => ({
					...prev,
					[name]: value
			}));
	};

	const handleSubmit = (e) => {
			e.preventDefault();
			onSubmit(formData);
			setFormData({
				id: '',
				title: '',
				author: '',
				isbn: '',
				total_copies: '',
				available_copies: '',
				status: 'Active'
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label htmlFor="id" className="form-label">ID libro *</label>
				<input 
					type="text"
					className="form-control"
					id="id"
					name="id"
				
				
				></input>
			</div>
		</form>
	)
}