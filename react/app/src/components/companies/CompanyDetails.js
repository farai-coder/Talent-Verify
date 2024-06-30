import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import {useParams} from "react-router-dom"

function CompanyDetails() {
  const params = useParams()
  const id = params.id
  const [company, setCompany] = useState({});
  const [departments, setDepartments] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched && !company.name && !departments.length) {
      axios.get(`http://localhost:8000/playground/companies/${id}/`)
        .then(response => {
          setCompany(response.data);
          setIsDataFetched(true);
        })
        .catch(error => {
          console.error(error);
        });
  
      axios.get(`http://localhost:8000/playground/companies/${id}/departments`)
        .then(response => {
          setDepartments(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  console.log("departments", departments)
  let departmentsItems = <span></span>
  if(departments.length > 0){
    departmentsItems = departments.map((department, index) => (
      <span key={index}>
        {department.name}
        {index < departments.length - 1 && ', '}
      </span>
    ));
  }
  
  return (
    <div class="Modal" tabindex="-1" className='p-5'>
    <div class="Modal-dialog ml-5" style={{ maxWidth: '90%', maxHeight: '90vh' }}>
      <div class="Modal-content " className='p-5' style={{ border: 'none', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.3)' }}>
        <div class="Modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className='fw-bold fs-20 ms-5'>Company Details</h1>
          <Link to={`/companies`} className="action-link">
            <button type="button" class="btn-close" data-bs-dismiss="Modal" aria-label="Close" style={{ fontSize: '20px', cursor: 'pointer' }}></button>
          </Link>
        </div>
        <div class="Modal-body" style={{ padding: '30px' }}>
          <div className="row">
            <div className="col-lg-6">
              <h1 className='fw-bold fs-10 text-secondary'>Company Information</h1>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Company Name:</strong> {company.name}</p>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Date of Registration:</strong> {company.date_of_registration}</p>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Registration Number:</strong> {company.registration_number}</p>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Address:</strong> {company.address}</p>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Contact Person:</strong> {company.contact_person}</p>
            </div>
            <div className="col-lg-6">
              <h1 className='fw-bold fs-10 text-secondary' >Departments Information</h1>
              <p className='p-2 text-secondary' >
              <strong className='fw-bold'style={{ marginRight: '1rem', display: 'inline-block' }}>Departments:</strong>
              {departments.length > 0 && (
              <span>
                {departmentsItems}
              </span>
            )}
              </p>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Employees:</strong> {company.number_of_employees}</p>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Contact:</strong> {company.contact_phone}</p>
              <p className='p-2 text-secondary'><strong className='fw-bold'>Email:</strong> {company.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}

export default CompanyDetails