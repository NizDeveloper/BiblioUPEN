import { useState } from 'react';

function FormStudent({ onSubmit }) {
  const [formData, setFormData] = useState({
    enrollment: '',
    name: '',
    email: '',
    phone: '',
    career: '',
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
      enrollment: '',
      name: '',
      email: '',
      phone: '',
      career: '',
      status: 'Active'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="enrollment" className="form-label">MATRÍCULA *</label>
        <input
          type="text"
          className="form-control"
          id="enrollment"
          name="enrollment"
          placeholder="Ej: 2024001"
          value={formData.enrollment}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">NOMBRE COMPLETO *</label>
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
        <label htmlFor="email" className="form-label">CORREO ELECTRÓNICO *</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Ej: estudiante@upnay.edu.mx"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">TELÉFONO *</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="Ej: +52 123 456 7890"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="career" className="form-label">CARRERA/GRADO *</label>
        <select
          className="form-select"
          id="career"
          name="career"
          value={formData.career}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona una carrera</option>
          <option value="ing-sistemas">Ingeniería en Sistemas</option>
          <option value="ing-industrial">Ingeniería Industrial</option>
          <option value="administracion">Administración</option>
          <option value="contabilidad">Contabilidad</option>
        </select>
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

export default FormStudent;
