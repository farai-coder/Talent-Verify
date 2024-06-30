import React, { useState } from 'react';
import axios from 'axios';

export default function BulkUpload() {
  const [comapaniesFile, setCompaniesFile] = useState();
  const [employeesFile, setEmployeesFile] = useState();
  const [uploadResponse, setUploadResponse] = useState(null);
  const [isCompanyFormSubmitted, setIsCompanyFormSubmitted] = useState(false);
  const [isEmployeeFormSubmitted, setIsEmployeeFormSubmitted] = useState(false);
  const companyUploadResponse = {
    "message": "Companies uploaded successfully",
    "num_uploaded": 5,
    "errors": []
  }
  
  const employeeUploadResponse = {
    "message": "Employees uploaded successfully",
    "num_uploaded": 10,
    "errors": []
  }

  const handleCompanyOnChange = (e) => {
    setCompaniesFile(e.target.files[0]);
    
  };

  const handleEmployeeOnChange = (e) => {
    setEmployeesFile(e.target.files[0]);
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    const comapanyFormData = new FormData();
    comapanyFormData.append('csv_file', comapaniesFile);
    setIsCompanyFormSubmitted(true);
    console.log('companies file', comapaniesFile )

    axios.post('http://localhost:8000/playground/companies/import_companies_csv/', comapanyFormData)
      .then(response => {
        setUploadResponse({ message: 'Successful uploaded the file!' });
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    const employeeDataForm = new FormData();
    employeeDataForm.append('csv_file', employeesFile);
    setIsEmployeeFormSubmitted(true);
    console.log("employees form", employeesFile)

    axios.post('http://localhost:8000/playground/employees/import_employees_csv/', employeeDataForm)
      .then(response => {
        setUploadResponse({ message: 'Successful uploaded the file!' });
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>

        <div style={{ textAlign: "center", padding: 20, border: "1px solid #ccc", borderRadius: 5, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }} className='mb-3'>
          <h4>Upload Companies File</h4>
          <form encType="multipart/form-data" onSubmit={handleCompanySubmit} >
            <input
              type="file"
              id="companyCsvFileInput"
              accept=".csv"
              onChange={handleCompanyOnChange}
              style={{ padding: 10, margin: 10 }}
            />
            <button type="submit" style={{ padding: 10, backgroundColor: "#777", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}>
              Upload Companies File
            </button>
          </form>
        </div>

        <div style={{ textAlign: "center", padding: 20, border: "1px solid #ccc", borderRadius: 5, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }} className='mb-3'>
          <h4>Upload Employees File</h4>
          <form encType="multipart/form-data" onSubmit={handleEmployeeSubmit}>
            <input
              type="file"
              id="employeeCsvFileInput"
              accept=".csv"
              onChange={handleEmployeeOnChange}
              style={{ padding: 10, margin: 10 }}
            />
            <button type="submit" 
            style={{ padding: 10,
            backgroundColor: "#777",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            ":focus": {
            boxShadow: "0 0 0 0.2rem #EB984E;"
            }}} class="btn btn-secondary m-2">

              Upload Employees File
            </button>
          </form>
        </div>

        {isCompanyFormSubmitted && (
          <div style={{ textAlign: "center", padding: 20, border: "1px solid #ccc", borderRadius: 5, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }} className='mb-3'>
            <p className="text-success" style={{ fontSize: 18, fontWeight: "bold" }}>
              {companyUploadResponse.message}
            </p>
          </div>
        )}

        {isEmployeeFormSubmitted &&
        <div style={{ textAlign: "center", padding: 20, border: "1px solid #ccc", borderRadius: 5, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
          {employeeUploadResponse && (
            <p className="text-success" style={{ fontSize: 18, fontWeight: "bold" }}>
              {employeeUploadResponse.message}
            </p>
          )}
        </div>
        }
    </div>
  );
}