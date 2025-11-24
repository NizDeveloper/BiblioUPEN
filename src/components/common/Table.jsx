function Table({ columns, data, actions }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.label}</th>
            ))}
            {actions && <th>ACTIONS</th>}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, i) => (
                  <td key={i}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="actions-cell">
                    {actions.map((action, i) => {
                      const label = typeof action.label === "function" ? action.label(row) : action.label;
                      const type = typeof action.type === "function" ? action.type(row) : action.type;

                      return (
                        <button
                          key={i}
                          className={`action-btn action-${type}`}
                          onClick={() => action.onClick(row)}
                          title={label}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
