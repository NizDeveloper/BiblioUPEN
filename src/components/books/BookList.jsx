import Table from '../common/Table';

function BookList({books, onEdit, onDelete, bookToDelete, deleteConfirming}){
  const columns =[
    {key: 'id', label: 'ID'},
    {key: 'title', label: 'TITULO' },
    {key: 'author', label: 'AUTOR'},
    {key: 'isbn', label: 'ISBN'},
    {key: 'total_copies', label:'COPIAS TOTALES'},
    {key: 'available_copies', label: 'DISPONIBLES'},
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
      onClick: (book) => console.log('Historial:', book)
    },
    {
      label: (book) => {
        if(deleteConfirming && bookToDelete?.id === book.id) {
          return '¿confirmar?';
        }
        return 'Eliminar';
      },
      type: 'danger',
      onClick: onDelete
    }
  ];
  
  return(
    <Table columns={columns} data={books} actions={actions}/>
  );
}

export default BookList;