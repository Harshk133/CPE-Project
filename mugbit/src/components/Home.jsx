import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, Badge } from 'react-bootstrap';
// import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function Home({ user }) {
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

  const handleDeleteDocument = async (documentId) => {
    try {
      const response = await axios.delete(`/api/documents/delete/${documentId}`);
      if (response.status === 200) {
        // Document deleted successfully, update the state to reflect the change
        setUploadedDocuments((prevDocuments) => prevDocuments.filter(doc => doc._id !== documentId));
      } else {
        console.error('Error deleting document:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
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

  // ####################### For User Data #######################
  // const [userData, setUserData] = useState({});

  // async function fetchUserData(token) {
  //     try {
  //         // Replace 'your-server-endpoint' with the actual server endpoint
  //         const response = await fetch('/api/users/login', {
  //             method: 'GET',
  //             headers: {
  //                 'Authorization': `Bearer ${token}`
  //                 // Add other headers if needed
  //             }
  //         });

  //         if (response.ok) {
  //             const user = await response.json();
  //             setUserData(user);
  //             console.log("my user>>>", user);
  //         } else {
  //             // Handle errors
  //             console.log('Error fetching user data');
  //         }
  //     } catch (error) {
  //         // Handle fetch errors
  //         console.error('Fetch error:', error);
  //     }
  // }

  // useEffect(() => {
  //     const token = localStorage.getItem('token'); // Replace 'your-token-key' with the actual key

  //     if (token) {
  //         decodeToken(token);
  //         fetchUserData(token);
  //     } else {
  //         // Handle the case where there's no token
  //         console.log('else case goes here....');
  //     }
  // }, []);

  // function decodeToken(token) {
  //     try {
  //         const decoded = jwtDecode(token); // Assuming you have jwt_decode installed
  //         setUserData(decoded);
  //         console.log(decoded);
  //     } catch (error) {
  //         // Handle decoding errors
  //         console.error('Token decoding error:', error);
  //     }
  // }

 

  return (
    <>
      <div className='container' style={{ margin: 0, padding: 0, width: '100%', height: '100vh', display: 'flex', justifyContent: "space-between" }}>
        {/* <Sidebar /> */}
        <div style={{ margin: 0, padding: 0, width: '100%', overflowY: "auto" }}>

          <h2><center><tt>Welcome, to MugBit!</tt></center></h2>
          <br />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {uploadedDocuments && uploadedDocuments.map((document, index) => (
              <Card key={index} style={{ width: '12rem', margin: '10px', cursor: 'pointer' }}>
                <Card.Body>
                  <img src="/MugBit.PNG" alt="Logo" />
                  <Card.Title><small><b>{document.name}</b></small></Card.Title>
                  <Card.Text>
                    Uploaded by: {document.uploadedBy} 
                    {/* {userData.username} */}
                    {/* {user.username} */}
                    <Badge bg="info">Document</Badge>
                    <Button style={{ background: 'orange', border: '1px solid orange' }} onClick={() => handleDocumentClick(document)}>Use This!</Button>
                    <Button variant="danger" style={{ marginLeft: '5px' }} onClick={() => handleDeleteDocument(document._id)}>Delete</Button>
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

