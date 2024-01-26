
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const FileUpload = ({ user }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('success');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('username', user && user.username);
      console.log(formData, user && user.username);

      await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded successfully Go to Home Page!!');
      setMessageVariant('success');
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. Please try again.');
      setMessageVariant('danger');
    }
  };

  return (
    <div className="container" style={{ display: "flex", width: "100%", margin: 0, padding: 0 }}>
      <div className='FormContainer' style={{ margin: "50px auto" }}>
        {message && (
          <Alert variant={messageVariant}>
            {message}{' '}
            {messageVariant === 'success' && (
              <Alert.Link href="/page/homepage">Home Page</Alert.Link>
            )}
          </Alert>
        )}

        <Form>
          <h3>
            <Form.Label>Input the File</Form.Label>
          </h3>
          <br />
          <Form.Control
            required
            type="file"
            onChange={handleFileChange}
          />
          <br />
          <Button onClick={handleUpload}>Upload File</Button>
        </Form>
      </div>
    </div>
  );
};

export default FileUpload;
