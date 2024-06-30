import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

function EditCompany() {
  const [companyData, setCompanyData] = useState({
    name: '',
    date_of_registration: '',
    registration_number: '',
    address: '',
    contact_person: '',
    number_of_employees: '',
    contact_phone: '',
    email: '',
  });
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/playground/companies/${id}`);
        setCompanyData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanyData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8000/playground/companies/${id}/update/`, companyData)
      .then((response) => {
        console.log(response);
        alert('Company data updated successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Error updating company data');
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <Link to={`/companies/`} className="action-link">
            <FaArrowLeft className='text-secondary'/>   
        </Link>
      <Form style={{ width: '40%', padding: '20px', fontSize: '10px' }}>
        <Form.Group controlId="name">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={companyData.name}
            name="name"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="date_of_registration">
          <Form.Label>Date of Registration</Form.Label>
          <Form.Control
            type="date"
            value={companyData.date_of_registration}
            name="date_of_registration"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="registration_number">
          <Form.Label>Company Registration Number</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={companyData.registration_number}
            name="registration_number"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder=""
            value={companyData.address}
            name="address"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="number_of_employees">
          <Form.Label>Number of Employees</Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            value={companyData.number_of_employees}
            name="number_of_employees"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="contact_person">
          <Form.Label>Contact Person</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={companyData.contact_person}
            name="contact_person"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder=""
            value={companyData.email}
            name="email"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="contact_phone">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="phone"
            placeholder=""
            value={companyData.contact_phone}
            name="contact_phone"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Link to={`/companies/`} className="action-link">
          <Button variant="secondary" type="submit" className='p-1 m-3' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default EditCompany;
