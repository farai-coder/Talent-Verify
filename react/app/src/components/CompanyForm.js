import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CompanyForm() {
  return (
    <div className="container d-flex justify-content-center">
      
    <Form>
      <Form.Group controlId="companyName">
        <Form.Label className='3'>Company Name</Form.Label>
        <Form.Control type="text" placeholder="Enter company name" />
      </Form.Group>

      <Form.Group controlId="registrationDate">
        <Form.Label className='mt-3'>Date of Registration</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="registrationNumber">
        <Form.Label className='mt-3'>Company Registration Number</Form.Label>
        <Form.Control type="text" placeholder="Enter registration number" />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label className='mt-3'>Address</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter address" />
      </Form.Group>

      <Form.Group controlId="departments">
        <Form.Label className='mt-3'>Departments</Form.Label>
        <Form.Control type="text" placeholder="IT, HR, Marketing" />
      </Form.Group>
      <Form.Group controlId="numberOfEmployees">
        <Form.Label className='mt-3'>Number of Employees</Form.Label>
        <Form.Control type="number" placeholder="10" />
      </Form.Group>
      <Form.Group controlId="contactPerson">
        <Form.Label className='mt-3'>Contact Person</Form.Label>
        <Form.Control type="text" placeholder="Farai Rato" />
      </Form.Group>
      <Form.Group controlId="contactPerson">
        <Form.Label className='mt-3'>Email</Form.Label>
        <Form.Control type="email" placeholder="Farairhato@gmail.com" />
      </Form.Group>
      <Form.Group controlId="contact number">
        <Form.Label className='mt-3'>Contact Number</Form.Label>
        <Form.Control type="phone" placeholder="+263 716522473" />
      </Form.Group>
      
      <Link to={`/companies`} className="action-link">
      <Button variant="secondary" type="submit " className='p-1 m-3'>
        Save Changes
      </Button>
      </Link>
    </Form>
    </div>
  );
}

export default CompanyForm;
