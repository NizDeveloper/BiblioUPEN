import {useState, useEffect} from 'react';

function FormStudent({onSubmit, initialData = null}){
  const [formData, setFormData] = useState({
    enrollment: '',
    name: '',
    email: '',
    phone: '',
    career: '',
    status: 'Active'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if(initialData){
      setFormData(initialData);
    }else{
      setFormData({
        enrollment: '',
        name: '',
        email: '',
        phone: '',
        career: '',
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
        <label htmlFor="enrollment" className="form-label">ENROLLMENT *</label>
        <input
          type="text"
          className="form-control"
          id="enrollment"
          name="enrollment"
          placeholder="Ej: 2024001"
          value={formData.enrollment}
          onChange={handleInputChange}
          disabled={initialData ? true : false}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">FULL NAME *</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Ej: Juan Pérez García"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">EMAIL *</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="student@upnay.edu.mx"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">PHONE NUMBER *</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="+52 123 456 7890"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="career" className="form-label">CAREER *</label>
        <select
          className="form-select"
          id="career"
          name="career"
          value={formData.career}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a career</option>
          <option value="ing-sistemas">Ingeniería en Sistemas</option>
          <option value="ing-industrial">Ingeniería Industrial</option>
          <option value="administracion">Administración</option>
          <option value="contabilidad">Contabilidad</option>
        </select>
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

export default FormStudent;