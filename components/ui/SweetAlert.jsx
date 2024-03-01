import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ type, title, text, onClose }) => {
  useEffect(() => {
    if (type && title && text) {
      Swal.fire({
        type,
        title,
        text,
        onClose,
      });
    }
  }, [type, title, text, onClose]);

  return null; // SweetAlert will handle the UI, so this component doesn't render anything
};

export default SweetAlert;
