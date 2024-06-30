import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [file, setFile] = useState();
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost:8000/playground/companies/import_csv', formData)
        .then(response => {
          setUploadResponse({ message: 'Successful uploaded the file!' });
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button type="submit">IMPORT CSV</button>
      </form>
      {uploadResponse && (
        <p className="text-success">{uploadResponse.message}</p>
      )}
    </div>
  );
}