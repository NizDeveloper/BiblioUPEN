import {useState, useEffect} from 'react';

function Modal({title, children, onSave, onClose}){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    const modal = document.getElementById('modal');
    
    const handleHidden = ()=>{
      setLoading(false);
      setError('');
      if(onClose){
        onClose();
      }
    };

    if(modal){
      modal.addEventListener('hidden.bs.modal', handleHidden);
      return ()=>modal.removeEventListener('hidden.bs.modal', handleHidden);
    }
  }, [onClose]);

  const handleSave = async ()=>{
    setLoading(true);
    setError('');
    
    try{
      const form = document.querySelector('.modal-body form');
      
      if(!form.checkValidity()){
        form.reportValidity();
        setLoading(false);
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      await onSave(data);

      form.reset();

      const modalElement = document.getElementById('modal');
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if(modal){
        modal.hide();
      }
    }catch(err){
      setError(err.message || 'Error saving');
      setLoading(false);
    }
  };

  const handleCancel = ()=>{
    setError('');
    setLoading(false);
  };

  return(
    <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h1 className="modal-title fs-5" id="modalLabel">{title}</h1>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {children}
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-light" 
              data-bs-dismiss="modal"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;