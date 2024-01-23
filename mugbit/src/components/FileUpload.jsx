
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
// import Sidebar from './Sidebar';

const FileUpload = ({ user }) => {
  const [file, setFile] = useState(null);

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

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container" style={{ display: "flex", width: "100%", margin: 0, padding: 0 }}>
      {/* <Sidebar /> */}
      <div className='FormContainer' style={{ margin: "50px auto" }}>
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
