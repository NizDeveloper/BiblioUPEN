import {useState, useEffect} from 'react';

function StudentForm({onSubmit, initialData = null}){
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!formData.enrollment || !formData.name || !formData.email || !formData.phone || !formData.career || !formData.status){
      setError('All fields are required');
      return;
    }

    onSubmit(formData);
  };

  return(
    <form onSubmit={handleSubmit}>
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
          placeholder="2024001"
          value={formData.enrollment}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            handleInputChange({target: {name: 'enrollment', value}});
          }}
          maxLength="20"
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
          placeholder="Juan Pérez García"
          value={formData.name}
          onChange={handleInputChange}
          maxLength="100"
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
          maxLength="100"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">PHONE NUMBER *</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="3121234567"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            handleInputChange({target: {name: 'phone', value}});
          }}
          maxLength="20"
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
          <option value="IAGRO">Inegeniería en Agrotecnologia</option>
          <option value="IAGB">Ingeniería en Agrobiotecnología</option>
          <option value="IPA">Ingeniería en Producción Animal</option>
          <option value="ISEC">Ingeniería en Sistemas Embebidos Computacionales</option>
          <option value="ISOFT">Ingeniería en Software</option>
          <option value="ITIID">Ingeniería en Tecnologías de la Información e Innovación Digital</option>
          <option value="LNA">Licenciatura en Administración</option>
          <option value="LNM">Llicanciatura en Negocios y Mercadotecnia</option>
          <option value="LMC">Licenciatura en Medico Cirujano</option>
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

export default StudentForm;