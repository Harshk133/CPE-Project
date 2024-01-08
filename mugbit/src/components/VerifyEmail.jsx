// Example using React Router
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    // Send token to backend for verification
    axios.get(`/api/users/verify-email/${token}`)
      .then(response => {
        // Handle successful verification (e.g., show a success message)
        console.log('Email verified successfully:', response.data.message);
      })
      .catch(error => {
        // Handle verification error (e.g., show an error message)
        console.error('Error verifying email:', error.response.data.message);
      });
  }, [token]);

  return (
    <div>
      {/* You can add UI elements here, such as a loading spinner or success/error messages */}
      Verifying email...
    </div>
  );
};

export default VerifyEmail;
