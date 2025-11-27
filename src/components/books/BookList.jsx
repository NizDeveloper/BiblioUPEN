import Table from '../common/Table';

function BookList({books, onEdit, onDelete, onHistory, bookToDelete, deleteConfirming}){
  const columns = [
    {key: 'title', label: 'TITLE'},
    {key: 'author', label: 'AUTHOR'},
    {key: 'isbn', label: 'ISBN'},
    {key: 'total_copies', label: 'TOTAL COPIES'},
    {key: 'available_copies', label: 'AVAILABLE COPIES'},
    {
      key: 'status',
      label: 'STATUS',
      render: (_, book) => {
        let status = 'Available';
        let statusClass = 'badge-available';
        
        if(book.is_discontinued){
          status = 'Discontinued';
          statusClass = 'badge-discontinued';
        }else if(book.available_copies === 0){
          status = 'Out of stock';
          statusClass = 'badge-out-of-stock';
        }
        
        return (
          <span className={`badge ${statusClass}`}>
            {status}
          </span>
        );
      }
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
      onClick: onHistory
    },
    {
      label: (book) => {
        if (deleteConfirming && bookToDelete?.isbn === book.isbn) {
          return 'Confirm?';
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