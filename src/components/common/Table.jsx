function Table({ columns, data, actions }){
  return(
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.label}</th>
            ))}
            {actions && <th>ACCIONES</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col, i) => (
                <td key={i}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="actions-cell">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      className={`action-btn action-${action.type}`}
                      onClick={() => action.onClick(row)}
                      title={action.label}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
