import React from 'react'

function Form() {
    const handleUploadFile = async () => {
        const formData = new FormData();
        const fileInput = document.getElementById('document');

        if (fileInput.files.length > 0) {
            formData.append('document', fileInput.files[0]);

            try {
                const response = await fetch('/api/documents/upload-document', {
                    method: 'POST',
                    body: formData,
                });
                
                const result = await response.json();

                // Display the extracted placeholders on the page
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `<big><tt>Extracted Placeholders:</tt> ${JSON.stringify(
                    result.placeholders.join(', ')
                )}</big><br/><br/>`;

                // Create input fields dynamically
                const inputFieldsDiv = document.createElement('div');
                inputFieldsDiv.innerHTML = '<h2>Fill in the details:</h2>';

                result.placeholders.forEach((placeholder) => {
                    const label = document.createElement('label');
                    label.textContent = `Enter ${placeholder}👉 `;

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.name = placeholder;
                    input.placeholder = `Enter ${placeholder}`;

                    inputFieldsDiv.appendChild(label);
                    inputFieldsDiv.appendChild(input);
                    inputFieldsDiv.appendChild(document.createElement('br'));
                });

                // Append the inputFieldsDiv to resultDiv
                resultDiv.appendChild(inputFieldsDiv);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            alert('Please choose a document to upload.');
        }
    };

    const handleSubmitForm = async () => {
        // Create an object from the entered values in the input fields
        const formDataObject = {};
        const inputFields = document.getElementById('result').getElementsByTagName('input');

        for (let i = 0; i < inputFields.length; i++) {
            formDataObject[inputFields[i].name] = inputFields[i].value;
        }

        try {
            const response = await fetch('/api/documents/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            });
            // Check if the request was successful (status code 200)
            if (response.ok) {
                // Convert the response to a blob
                const blob = await response.blob();

                // Create a download link
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'MugBit_Generated_Document.docx';

                // Append the link to the document
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            } else {
                console.error('Error downloading document:', response.statusText);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <div>
            <div className="container my-7">
                <br />
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <img src="/MugBit.PNG" alt="Logo" style={{ "width": "60%", "margin": "0 auto" }} />
                            <div className="card-header text-white" style={{ "background": "orange" }}>
                                <h1 className="text-center" style={{ "background": "orange", "color": "black" }}>Upload File 🔥</h1>
                            </div>
                            <div className="card-body">
                                <form id="uploadForm" encType="multipart/form-data">
                                    <div className="form-group">
                                        <label htmlFor="document">Choose a Document Here 👉</label>
                                        <input type="file" id="document" name="document" accept=".docx" className="form-control-file" />
                                    </div>

                                    <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                                        <button type="button" onClick={handleUploadFile} className="btn btn-success" style={{ "background": "orange", "border": "orange" }}>Upload ✔️</button>
                                        <button type="button" onClick={handleSubmitForm} className="btn" style={{ "background": "yellowgreen" }}>Use This! 👍</button>
                                    </div>
                                </form>

                                <form id="result" name="result" className="mt-4"></form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;
