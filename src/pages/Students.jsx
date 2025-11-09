import {useState, useEffect} from 'react';
import {studentService} from '../services/studentService';
import Layout from '../components/common/Layout';
import ControlSection from '../components/common/ControlSection';
import Modal from '../components/common/Modal';
import StudentList from "../components/students/StudentList"
import FormStudent from '../components/students/StudentForm';
import ToastPortal from '../components/common/ToastPortal';

function Students(){
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteConfirming, setDeleteConfirming] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await studentService.getAll();
    console.log('Datos recibidos:', data);
    setStudents(data || []);
    setLoading(false);
  };

  const filteredStudents = students.filter(student=>{
    if(!student)return false;
    const name = student.name ? student.name.toLowerCase() : '';
    const enrollment = student.enrollment ? student.enrollment.toLowerCase() : '';
    const email = student.email ? student.email.toLowerCase() : '';
    const phone = student.phone ? student.phone.toLowerCase() : '';
    const career = student.career ? student.career.toLowerCase() : '';
    const status = student.status ? student.status.toLowerCase() : '';
    const searchLower = searchTerm.toLowerCase();
    
    return name.includes(searchLower) || 
           enrollment.includes(searchLower) || 
           email.includes(searchLower) || 
           phone.includes(searchLower) || 
           career.includes(searchLower) || 
           status.includes(searchLower);
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddStudent = () => {
    setIsEditing(false);
    setStudentToEdit(null);
    
    const modalElement = document.getElementById('modal');
    if(modalElement){
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setStudentToEdit(student);
    
    const modalElement = document.getElementById('modal');
    if(modalElement){
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const handleSubmitStudent = async (formData) => {
    try{
      if(isEditing){
        await studentService.update(studentToEdit.enrollment, formData);
        await loadStudents();
        
        setToast({
          message: 'Estudiante actualizado exitosamente',
          type: 'success',
          duration: 3000
        });
      }else{
        await studentService.create(formData);
        await loadStudents();
        
        setToast({
          message: 'Estudiante agregado exitosamente',
          type: 'success',
          duration: 3000
        });
      }
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: error.message || 'Error al guardar el estudiante',
        type: 'error',
        duration: 4000
      });
      throw error;
    }
  };

  const handleDelete = (student) => {
    if(deleteConfirming && studentToDelete?.enrollment === student.enrollment){
      performDelete(student);
      return;
    }

    setStudentToDelete(student);
    setDeleteConfirming(true);

    setTimeout(() => {
      setDeleteConfirming(false);
      setStudentToDelete(null);
    }, 5000);
  };

  const performDelete = async (student) => {
    try{
      await studentService.delete(student.enrollment);
      await loadStudents();
      
      setStudentToDelete(null);
      setDeleteConfirming(false);
      
      setToast({
        message: 'Estudiante eliminado exitosamente',
        type: 'success',
        duration: 3000
      });
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: 'Error al eliminar el estudiante',
        type: 'error',
        duration: 4000
      });
      setDeleteConfirming(false);
      setStudentToDelete(null);
    }
  };

  if(loading)return <Layout><div>Cargando...</div></Layout>;

  return(
    <>
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
              studentToDelete={studentToDelete}
              deleteConfirming={deleteConfirming}
            />
          </div>

          <Modal
            title={isEditing ? "Editar Estudiante" : "Agregar Nuevo Estudiante"}
            onSave={handleSubmitStudent}
            onClose={() => {
              setIsEditing(false);
              setStudentToEdit(null);
            }}>

            <FormStudent key={isEditing ? studentToEdit?.enrollment : 'add'} onSubmit={handleSubmitStudent} initialData={isEditing ? studentToEdit : null}/>
          </Modal>
        </div>
      </Layout>

      {toast && (
        <ToastPortal
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default Students;