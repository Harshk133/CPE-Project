import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, Badge, Placeholder } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import "./css/Home.css";

function Home({ user, isMenuOpen }) {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
    const intervalId = setInterval(fetchDocuments, 5000);
    return () => clearInterval(intervalId);
  }, []);

  console.log('user.username:', user && user.username);
  console.log('document.uploadedBy:', document.uploadedBy);


  return (
    <>
    {/* style={{ margin: 0, padding: 0, width: '100%', height: '100vh', display: 'flex', justifyContent: "space-between" }} */}
      <div className={`${isMenuOpen ? 'content-compressed' : 'main-content'}`} >
        {/* <Sidebar /> */}
        <div style={{ margin: 0, padding: 0, width: '100%', overflowY: "auto" }}>

          <h2><center><tt>Welcome, to MugBit!</tt></center></h2>
          <br />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>


            {loading ? ( // Render skeleton loading when data is still loading
              Array.from({ length: 6 }).map((_, index) => (
                // <SkeletonTheme key={index} baseColor="#202020" highlightColor="#444">
                //   <Card key={index} style={{ width: '12rem', margin: '10px', cursor: 'pointer' }}>
                //     <Card.Body>
                //       <Skeleton height={150} count={7} duration={2} />
                //     </Card.Body>
                //   </Card>
                // </SkeletonTheme>
                <Card style={{ width: '12rem', margin: '10px', cursor: 'pointer' }}>
                  <Card.Img variant="top" src="/Mugbit.png" />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow" style={{background: "#656b71", color: "whitesmoke"}}>
                      <Placeholder xs={6} style={{background: "#656b71", color: "whitesmoke"}} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow" style={{background: "#656b71", color: "whitesmoke"}}>
                      <Placeholder xs={7} style={{background: "#656b71", color: "whitesmoke"}} /> 
                      <Placeholder xs={4} style={{background: "#656b71", color: "whitesmoke"}} /> 
                      <Placeholder xs={4} style={{background: "#656b71", color: "whitesmoke"}} />{' '}
                      <Placeholder xs={6} style={{background: "#656b71", color: "whitesmoke"}} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button xs={6} style={{background: "orange"}} />
                  </Card.Body>
                </Card>
              ))
            ) : (
              // Render actual card components when data is loaded
              uploadedDocuments && uploadedDocuments.map((document, index) => (
                <Card key={index} style={{ width: '12rem', margin: '10px', cursor: 'pointer' }}>
                  <Card.Body>
                    <img src="/MugBit.PNG" alt="Logo" />
                    <Card.Title><small><b>{document.name || <Skeleton />}</b></small></Card.Title>
                    <Card.Text>
                      Uploaded by: {document.uploadedBy || <Skeleton count={2} />}
                      <Badge bg="info">Document</Badge>
                      <Button style={{ background: 'orange', border: '1px solid orange' }} onClick={() => handleDocumentClick(document)}>Use This!</Button>
                      {/* <Button variant="danger" style={{ marginLeft: '5px' }} onClick={() => handleDeleteDocument(document._id)}>Delete</Button> */}
                      {user && user.username === document.uploadedBy && (
                        <Button variant="danger" style={{ marginLeft: '5px' }} onClick={() => handleDeleteDocument(document._id)}>
                          Delete
                        </Button>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            )}

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

