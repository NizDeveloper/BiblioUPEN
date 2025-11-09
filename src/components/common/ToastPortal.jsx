import { createPortal } from 'react-dom';
import Toast from './Toast';

function ToastPortal({ message, type, duration, onClose }) {
  return createPortal(
    <Toast
      message={message}
      type={type}
      duration={duration}
      onClose={onClose}
    />,
    document.body
  );
}

export default ToastPortal;