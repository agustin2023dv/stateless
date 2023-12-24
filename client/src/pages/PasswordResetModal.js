import React, { useState } from 'react';
import { db } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import '../assets/styles/Styles.css';
import { validateEmptyEmail, validateEmailFormat } from '../validation';
import { useHistory } from 'react-router-dom';

function PasswordResetModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  if (!isOpen) return null;

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    // Validar correo electrónico
    if (!validateEmptyEmail(email)) {
        history.push('/');
        return;
      }

    if (!validateEmailFormat(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(db, email);
      alert('Check your email');
    } catch (err) {
      setError(err.message); // Mostrar mensaje de error
    }
  };

  return (
    <div className="password-reset-modal">
      <div className="modal-content">
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Reset password</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PasswordResetModal;
