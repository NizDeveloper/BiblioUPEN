import { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import Layout from '../components/common/Layout';
import ControlSection from '../components/common/ControlSection';
import Modal from '../components/common/Modal';
import StudentList from "../components/students/StudentList"
import FormStudent from '../components/students/StudentForm';
import ToastPortal from '../components/common/ToastPortal';
import StudentHistoryModal from '../components/students/StudentHistoryModal';

function Students(){
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteConfirming, setDeleteConfirming] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async() => {
    const data = await studentService.getAll();
    setStudents(data || []);
    setLoading(false);
  };

  const filteredStudents = students.filter(student => {
    if(!student)return false;
    const name = student.name ? student.name.toLowerCase() : '';
    const enrollment = student.enrollment ? student.enrollment.toLowerCase() : '';
    const email = student.email ? student.email.toLowerCase() : '';
    const phone = student.phone ? student.phone.toLowerCase() : '';
    const career = student.career ? student.career.toLowerCase() : '';
    const status = student.status ? student.status.toLowerCase() : '';
    const searchLower = searchTerm.toLowerCase();

    return name.includes(searchLower) || enrollment.includes(searchLower) || email.includes(searchLower) || phone.includes(searchLower) || career.includes(searchLower) || status.includes(searchLower);
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

  const handleSubmitStudent = async(formData) => {
    try{
      if(isEditing){
        await studentService.update(studentToEdit.enrollment, formData);
        await loadStudents();

        setToast({
          message: 'Student successfully updated',
          type: 'success',
          duration: 3000
        });
      }else{
        await studentService.create(formData);
        await loadStudents();

        setToast({
          message: 'Student successfully added',
          type: 'success',
          duration: 3000
        });
      }
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: error.message || 'Error saving student',
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

  const performDelete = async(student) => {
    try{
      await studentService.delete(student.enrollment);
      await loadStudents();

      setStudentToDelete(null);
      setDeleteConfirming(false);

      setToast({
        message: 'Student successfully removed',
        type: 'success',
        duration: 3000
      });
    }catch(error){
      console.error('Error:', error);
      setToast({
        message: 'Error deleting student',
        type: 'error',
        duration: 4000
      });
      setDeleteConfirming(false);
      setStudentToDelete(null);
    }
  };

  const handleHistory = (student) => {
    setSelectedStudent(student);
  };

  if(loading)return <Layout><div>Loading...</div></Layout>;

  return(
    <>
      <Layout>
        <div className="student-page">
          <h1>Student Management</h1>
          <ControlSection
            placeholder="Search by enrollment plate or name..."
            messageButton="+ New Student"
            onSearch={handleSearch}
            onAdd={handleAddStudent}
            searchValue={searchTerm}
          />

          <div className="table-section">
            <h2 className="table-title">List of students ({students.length})</h2>

            <StudentList
              students={filteredStudents}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onHistory={handleHistory}
              studentToDelete={studentToDelete}
              deleteConfirming={deleteConfirming}
            />
          </div>

          <Modal
            title={isEditing ? "Edit Student" : "Add New Student"}
            onSave={handleSubmitStudent}
            onClose={() => {
              setIsEditing(false);
              setStudentToEdit(null);
            }}>

            <FormStudent key={isEditing ? studentToEdit?.enrollment : 'add'} onSubmit={handleSubmitStudent} initialData={isEditing ? studentToEdit : null}/>
          </Modal>
        </div>
      </Layout>

      {selectedStudent && (
        <StudentHistoryModal
          enrollment={selectedStudent.enrollment}
          studentName={selectedStudent.name}
          onClose={() => setSelectedStudent(null)}
        />
      )}

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
