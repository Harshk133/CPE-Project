import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';

function Home() {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [userInput, setUserInput] = useState({});

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setUserInput({});
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setSelectedDocument(null);
    setUserInput({});
  };

  const handleInputChange = (placeholderName, value) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      [placeholderName]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const jsonString = JSON.stringify(userInput);
      const response = await fetch(`/api/documents/generate/${selectedDocument._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonString,
      });
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'MugBit_Generated_Document.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // console.log("this is a response see here====>", response);
      // console.log(userInput);
    } catch (error) {
      console.error('Error generating filled document:', error);
    }
    setSelectedDocument(null);
    setUserInput({});
    setShowFormModal(false);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents/files');
        setUploadedDocuments(response.data);
        // console.log(response);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
    const intervalId = setInterval(fetchDocuments, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='container' style={{ margin: 0, padding: 0, width: '100%', height: '100vh', display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '2px 10px', margin: '0 auto', width: '80%' }}>
          <h2><center><tt>Welcome, to MugBit!</tt></center></h2>
          <Button style={{ background: 'orange', border: '1px solid orange' }}>Hello</Button>
          <br />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {uploadedDocuments && uploadedDocuments.map((document, index) => (
              <Card key={index} style={{ width: '18rem', margin: '10px', cursor: 'pointer' }} onClick={() => handleDocumentClick(document)}>
                <Card.Body>
                  <img src="/MugBit.PNG" alt="Logo" />
                  <Card.Title>{document.name}</Card.Title>
                  <Card.Text>
                    Uploaded by: {document.uploadedBy}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Modal key={selectedDocument ? selectedDocument.id : 'no-document'} show={showFormModal} onHide={handleCloseFormModal}>
            <Modal.Header closeButton>
              <Modal.Title>Fill in the Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {selectedDocument && selectedDocument.placeholders.map((placeholder, index) => (
                  <Form.Group key={index} controlId={`placeholder-${index}`}>
                    <Form.Label>Enter for {placeholder}</Form.Label>
                    <Form.Control
                      type={placeholder.type === 'text' ? 'text' : 'textarea'}
                      placeholder={`Enter ${placeholder}`}
                      onChange={(e) => handleInputChange(placeholder, e.target.value)}
                    />
                  </Form.Group>
                ))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseFormModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                Download Document
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Home;

