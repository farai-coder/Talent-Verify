import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

function AddEmployee() {
  const [employeeData, setEmployeeData] = useState({
    employee_id: '',
    national_id: '',
    name: '',
    department: '',
    role: '',
    date_started: '',
    date_left: '',
    duties: '',
    company: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('employee form', employeeData)
    axios.post('http://localhost:8000/playground/employees/create/', employeeData)
      .then((response) => {
        console.log(response);
        alert('Employee data saved successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Error saving employee data');
      });
  };
  
  return (
    <div className="container d-flex justify-content-center">
      <Link to={`/employees/`} className="action-link">
            <FaArrowLeft className='text-secondary'/>   
        </Link>
      <Form style={{ width: '40%', padding: '20px', fontSize: '10px' }}>
        <Form.Group controlId="name">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={employeeData.name}
            name="name"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="employee_id">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={employeeData.employee_id}
            name="employee_id"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="national_id">
          <Form.Label>National Id</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={employeeData.national_id}
            name="national_id"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        {/* <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Select
            value={employeeData.department}
            name="department"
            onChange={handleChange}
            className='shadow-lg'
          >
            <option>HR</option>
            <option>Administration</option>
            <option>IT</option>
            <option>Operations</option>
            <option>Accounting</option>
            <option>finance</option>
            <option>Marketing</option>
            <option>Procurement</option>
          </Form.Select>
        </Form.Group> */}
        <Form.Group controlId="depatment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={employeeData.department}
            name="department"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={employeeData.role}
            name="role"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="date_started">
          <Form.Label>Date Started</Form.Label>
          <Form.Control
            type="date"
            value={employeeData.date_started}
            name="date_started"
            onChange={handleChange }
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="date_left">
          <Form.Label>Date Left</Form.Label>
          <Form.Control
            type="date"
            value={employeeData.date_left}
            name="date_left"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="duties">
          <Form.Label>Duties</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder=""
            value={employeeData.duties}
            name="duties"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Form.Group controlId="company">
          <Form.Label>Company worked for</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={employeeData.company}
            name="company"
            onChange={handleChange}
            className='shadow-lg'
          />
        </Form.Group>

        <Link to={`/employees`} className="action-link">
          <Button variant="secondary" type="submit" className='p-1 m-3' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default AddEmployee;