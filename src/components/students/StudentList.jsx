import Table from '../common/Table';

function StudentList({ students, onEdit, onDelete, studentToDelete, deleteConfirming }){
  const columns = [
    { key: 'enrollment', label: 'ENROLLMENT' },
    { key: 'name', label: 'NAME' },
    { key: 'email', label: 'MAIL' },
    { key: 'phone', label: 'PHONE' },
    { key: 'career', label: 'CARRER' },
    {
      key: 'status',
      label: 'STATUS',
      render: (status) => (
        <span className={`badge badge-${status.toLowerCase()}`}>
          {status}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: 'Edit',
      type: 'primary',
      onClick: onEdit
    },
    {
      label: 'History',
      type: 'secondary',
      onClick: (student) => console.log('History:', student)
    },
    {
      label: (student) => {
        if (deleteConfirming && studentToDelete?.enrollment === student.enrollment) {
          return '¿Confirm?';
        }
        return 'Delete';
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