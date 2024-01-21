import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from "axios";
import FileUpload from './FileUpload';

function Home() {

  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const handleDocumentUpload = (newDocument) => {
    setUploadedDocuments((prevDocuments) => [...prevDocuments, newDocument]);
  };

  useEffect(() => {
    // Fetch documents when the component mounts
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents/files');
        setUploadedDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
    const intervalId = setInterval(fetchDocuments, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      {/* This is the container Div */}
      <div className='container' style={{ margin: 0, padding: 0, width: "100%", height: "100vh", display: "flex" }}>
        {/* This is the sidebar Div */}
        <Sidebar />

        <div style={{ padding: "2px 10px", margin: "0 auto", width: "80%" }}>
          <h2><center><tt>Welcome, to MugBit!</tt></center></h2>
          <Button style={{ background: "orange", border: "1px solid orange" }}>Hello</Button>
          <br />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Display uploaded documents as cards */}
            {uploadedDocuments.map((document, index) => (
              <Card key={index} style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <img src="/MugBit.PNG" alt="Logo" />
                  <Card.Title>{document.name}</Card.Title>
                  <Card.Text>
                    {/* You can customize the content here based on your document structure */}
                    Uploaded by: {document.uploadedBy}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          {/* FileUpload component for document upload */}
          <FileUpload onDocumentUpload={handleDocumentUpload} />
        </div>
      </div>
    </>
  )
}

export default Home;
