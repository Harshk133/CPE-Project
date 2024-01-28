// import React, { useState } from 'react';
// // import { jwtDecode } from 'jwt-decode';
// import { Button, Modal } from 'react-bootstrap';
// import Avatar from "react-avatar-edit";

// function Profile({ user }) {

//   const [preview, setPreview] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const onClose = () => {
//     setPreview(null);
//     setModalOpen(false);
//   };

//   // const onClose = () => {
//   //   setPreview(null);
//   // };

//   const onCrop = (preview) => {
//     setPreview(preview);
//   };


//   const updateUserProfilePicture = async (preview) => {
//     try {
//       // Assuming you have a server running at http://localhost:3001
//       const apiUrl = '/api/users/update-profile-picture';
//       const token = localStorage.getItem('token');

//       const formData = new FormData();
//       formData.append("email", user.email);
//       formData.append('picture', dataURItoFile(preview));

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         // Handle error based on your API response
//         console.error('Error updating profile picture:', response.statusText);
//       }

//       const updatedUserData = await response.json();
//       console.log('Updated user data:', updatedUserData);

//       // You might want to update the user data in your state or Redux store here
//     } catch (error) {
//       console.error('Error updating profile picture:', error);
//       // Handle other errors (e.g., network error)
//     }
//   };

//   // // Helper function to convert data URI to Blob
//   // const dataURItoBlob = (dataURI) => {
//   //   const byteString = atob(dataURI.split(',')[1]);
//   //   const arrayBuffer = new ArrayBuffer(byteString.length);
//   //   const uint8Array = new Uint8Array(arrayBuffer);

//   //   for (let i = 0; i < byteString.length; i++) {
//   //     uint8Array[i] = byteString.charCodeAt(i);
//   //   }

//   //   return new Blob([arrayBuffer], { type: 'image/jpeg' });
//   // };

//   // Helper function to convert data URI to File
//   const dataURItoFile = (dataURI, fileName) => {
//     const byteString = atob(dataURI.split(',')[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uint8Array = new Uint8Array(arrayBuffer);

//     for (let i = 0; i < byteString.length; i++) {
//       uint8Array[i] = byteString.charCodeAt(i);
//     }

//     const blob = new Blob([uint8Array], { type: 'image/jpeg' });

//     // Create a File object
//     const file = new File([blob], fileName, { type: 'image/jpeg' });
//     return file;
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div>
//         {user.username}!
//         <br />
//         {user.email}
//         {user && (
//           <div>
//             <p>Welcome, {user.username}!</p>
//             {/* {user.userimg ? (
//               <img src={`${user.userimg}`} alt="User" style={{ width: "27%", borderRadius: "10px" }} onClick={() => setModalOpen(true)} />
//             ) : (
//               <img src="/placeholderimg.png" alt="Default User" style={{ width: "27%", borderRadius: "10px" }} onClick={() => setModalOpen(true)} />
//             )} */}
//             {user.userimg ? (
//               <img
//                 src={`${user.userimg}?${new Date().getTime()}`} // Add a timestamp to the URL
//                 alt="User"
//                 style={{ width: "27%", borderRadius: "10px" }}
//                 onClick={() => setModalOpen(true)}
//               />
//             ) : (
//               <img
//                 src="/placeholderimg.png"
//                 alt="Default User"
//                 style={{ width: "27%", borderRadius: "10px" }}
//                 onClick={() => setModalOpen(true)}
//               />
//             )}
//           </div>
//         )}


//         {modalOpen && (
//           <Modal show={modalOpen} onHide={onClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Update Profile Picture</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Avatar width={390} height={295} onCrop={onCrop} label="Choose a profile picture" />
//               {preview && (
//                 <div>
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }}
//                   />
//                   <Button variant="primary" onClick={() => updateUserProfilePicture(preview)}>
//                     Update Profile Picture
//                   </Button>
//                 </div>
//               )}
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={onClose}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Profile;

import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Avatar from "react-avatar-edit";
import Alert from 'react-bootstrap/Alert';

function Profile({ user }) {
  const [preview, setPreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgPath, setImgPath] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onClose = () => {
    setPreview(null);
    setModalOpen(false);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const updateUserProfilePicture = async (preview) => {
    try {
      const apiUrl = '/api/users/update-profile-picture';
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append("email", user.email);
      formData.append('picture', dataURItoFile(preview));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error('Error updating profile picture:', response.statusText);
      }

      const updatedUserData = await response.json();
      console.log('Updated user data:', updatedUserData.user.userimg);
      setImgPath(updatedUserData.user.userimg);

      setSuccessMessage('Profile picture updated successfully');
      alert('Profile picture updated successfully');
      // Close the modal
      onClose();

      // You might want to update the user data in your state or Redux store here
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setSuccessMessage('Error updating profile picture!!');
    }
  };

  const dataURItoFile = (dataURI, fileName) => {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    const file = new File([blob], fileName, { type: 'image/jpeg' });
    return file;
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
      {user && (
          <div>
            <p>Welcome, {user.username}!</p>
            {user.userimg ? (
              <div>                
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <img
                  // key={`${user.userimg}?${new Date().getTime()}`}
                  src={imgPath ? `${imgPath}` : `${user.userimg}`}
                  alt="User"
                  style={{ width: "70%", borderRadius: "10px" }}
                  onClick={() => setModalOpen(true)}
                />
              </div>
            ) : (
              <div>
              {successMessage && <Alert variant="danger">{successMessage}</Alert>}
                <img
                  src="/placeholderimg.png"
                  alt="Default User"
                  style={{ width: "27%", borderRadius: "10px" }}
                  onClick={() => setModalOpen(true)}
                />
              </div>
            )}
          </div>
        )}
        {user.username}!
        <br />
        {user.email}
        

        {modalOpen && (
          <Modal show={modalOpen} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Avatar width={390} height={295} onCrop={onCrop} label="Choose a profile picture" />
              {preview && (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }}
                  />
                  <Button variant="primary" onClick={() => updateUserProfilePicture(preview)}>
                    Update Profile Picture
                  </Button>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Profile;
