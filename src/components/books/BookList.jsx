import Table from '../common/Table';


function BookList({books, onEdit, onDelete, bookToDelete, deleteConfirming}){
  const columns = [
    {key: 'title', label: 'TITLE'},
    {key: 'author', label: 'AUTHOR'},
    {key: 'isbn', label: 'ISBN'},
    {key: 'total_copies', label: 'TOTAL_COPIES'},
    {key: 'available_copies', label: 'AVAILABLE_COPIES'},
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
      label : 'Edit',
      type: 'primary',
      onClick: onEdit
    },
    {
      label: 'History',
      type: 'secondary',
      onclick: (book) => console.log('History:', book)
    },
    {
      label: (book) => {
        if (deleteConfirming && bookToDelete?.isbn === book.isbn) {
          return '¿Confirm?';
        }
        return 'Delete';
      },
      type: 'danger',
      onClick: onDelete
    }
  ];

  return(
    <Table columns={columns} data={books} actions={actions} />
  );
}

export default BookList;