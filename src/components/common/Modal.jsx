function Modal({ title, children, onSave }) {
  return (
    <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h1 className="modal-title fs-5" id="modalLabel">{title}</h1>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={onSave}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
