import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import StudentList from "../components/students/StudentList"
import ControlSection from '../components/common/ControlSection';
import { studentService } from '../services/studentService';

function Students(){
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    const loadStudents = async () => {
      const data = await studentService.getAll();
      console.log('Datos recibidos:', data);
      setStudents(data || []);
      setLoading(false);
    };
    loadStudents();
  }, []);

  // Filtrar estudiantes por búsqueda
  const filteredStudents = students.filter(student => {
    if (!student) return false;
    const name = student.name ? student.name.toLowerCase() : '';
    const enrollment = student.enrollment ? student.enrollment.toLowerCase() : '';
    return name.includes(searchTerm.toLowerCase()) || enrollment.includes(searchTerm.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddStudent = () => {
    console.log('Agregar nuevo estudiante');
  };

  const handleEdit = (student) => {
    console.log('Editar:', student);
  };

  const handleDelete = (student) => {
    setStudents(students.filter(s => s.enrollment !== student.enrollment));
  };

  if (loading) return <Layout><div>Cargando...</div></Layout>;

  return(
    <Layout>
      <div className="student-page">
        <h1>Gestión de Estudiantes</h1>
        <ControlSection
          placeholder="Buscar por matrícula o nombre..."
          messageButton="+ Nuevo Estudiante"
          onSearch={handleSearch}
          onAdd={handleAddStudent}
          searchValue={searchTerm}
        />

        <div className="table-section">
          <h2 className="table-title">Lista de estudiantes ({students.length})</h2>

          <StudentList
            students={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Students;
