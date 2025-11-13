import { useState, useEffect, useRef } from 'react';
import { ReactComponent as CheckIcon} from "../../assets/images/icons/check.svg"
import { ReactComponent as ErrorIcon} from "../../assets/images/icons/close.svg"
import { ReactComponent as WarningIcon } from "../../assets/images/icons/warnign.svg"
import { ReactComponent as InfoIcon} from "../../assets/images/icons/info.svg"

function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [show, setShow] = useState(true);
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current && show) {
      const bsToast = new window.bootstrap.Toast(toastRef.current, {
        autohide: true,
        delay: duration
      });
      bsToast.show();

      const hideListener = () => {
        setShow(false);
        if (onClose) onClose();
      };

      toastRef.current.addEventListener('hidden.bs.toast', hideListener);
      return () => {
        toastRef.current?.removeEventListener('hidden.bs.toast', hideListener);
      };
    }
  }, [duration, onClose, show]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckIcon className="toast-icon-svg" />;
      case 'error':
        return <ErrorIcon className="toast-icon-svg" />;
      case 'warning':
        return <WarningIcon className="toast-icon-svg" />;
      case 'info':
        return <InfoIcon className="toast-icon-svg" />;
      default:
        return <InfoIcon className="toast-icon-svg" />;
    }
  };

  return (
    <div
      ref={toastRef}
      className={`toast toast-${type}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <span className="toast-icon">{getIcon()}</span>
        <strong className="me-auto">Notification</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}

export default Toast;