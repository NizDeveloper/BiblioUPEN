import Table from '../common/Table';

function StudentList({ students, onEdit, onDelete, studentToDelete, deleteConfirming }){
  const columns = [
    { key: 'enrollment', label: 'MATRÍCULA' },
    { key: 'name', label: 'NOMBRE' },
    { key: 'email', label: 'CORREO' },
    { key: 'phone', label: 'TELÉFONO' },
    { key: 'career', label: 'CARRERA' },
    {
      key: 'status',
      label: 'ESTADO',
      render: (status) => (
        <span className={`badge badge-${status.toLowerCase()}`}>
          {status}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: 'Editar',
      type: 'primary',
      onClick: onEdit
    },
    {
      label: 'Historial',
      type: 'secondary',
      onClick: (student) => console.log('Historial:', student)
    },
    {
      label: (student) => {
        if (deleteConfirming && studentToDelete?.enrollment === student.enrollment) {
          return '¿Confirmar?';
        }
        return 'Eliminar';
      },
      type: 'danger',
      onClick: onDelete
    }
  ];

  return(
    <Table columns={columns} data={students} actions={actions} />
  );
}

export default StudentList;