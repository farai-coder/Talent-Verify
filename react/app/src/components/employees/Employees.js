import React from "react";
import { useState } from "react";
import {Link, useParams} from "react-router-dom"
import "../App.css"
import axios from "axios"
import { useEffect } from "react";
import EmployeeSearchBar from "./EmployeeSearchBar";

function Employees() {
    const [search, setSearch] = useState("")
    const [employees, setEmployees] = useState([])
    const [searchParameter, setSearchParameter] = useState('');
    //const params = useParams()
    // const id = params.id
    // console.log("id", id)

    async function loadEmployees(){
      axios.get(
          "http://localhost:8000/playground/employees/"
          ).then(function (response) {
              setEmployees(response.data)
          });
  }

 useEffect(() => {
      loadEmployees();
  }, []);
  console.log('employees', employees)

    const [FormData,setFormData] = useState({
        firstName: "",
        email: ""
    })
   
    
    const handleSearchInputChange = (newSearchParameter) => {
      setSearchParameter(newSearchParameter);
      console.log('search from bar', searchParameter)
      console.log('seach in bar', newSearchParameter)
    };
    
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(2); // Number of employees to display per page
    const indexOfLastEmplyee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmplyee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmplyee);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChang = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to the first page when search changes
    };

 
    function handleClick(event) {
        const {name, value} = event.target
        
        setFormData(prevState=>{
            return{
            ...prevState,[name]: value}
        })
        console.log(event)
        console.log(value)
        console.log(FormData)
    }
    function handleChange(event){
        setSearch(event.target.value)
        console.log(search)
    }
    const filteredEmployees = employees.filter((employee) => {
      const name = employee.name.toLowerCase();
      const employee_id = employee.employee_id.toString();
      const searchQuery = searchParameter
  
      return (
        name.includes(searchQuery) || employee_id.includes(searchQuery)
      );
    });
    
    return (
        <div className="container ">
          <EmployeeSearchBar onSearchInputChange={handleSearchInputChange}/>
          <section className="mt-5">
            
            <div className="row row-cols-1 row-cols-md-4 g-4 ">
              {filteredEmployees.map((employee, index) => (
                <div key={employee.employeeID} className="card h-400 m-4 p-4 border shadow-lg">
                  <h5 className="fw-bold">{employee.name}</h5>
                  <p className="mt-3"><strong className="fw-bold text-secondary">Employee ID:</strong> {employee.employee_id}</p>
                  <p className="mt-2 mb-1"><strong className="fw-bold text-secondary">Department:</strong> {employee.department}</p>
                  <p className="mb-2"><strong className="fw-bold text-secondary">Role: </strong>{employee.role}</p>
                  <p className="mb-2"><stong className="fw-bold text-secondary">Date started:</stong> {employee.date_started}</p>
                  <p className="mb-2"><strong className="fw-bold text-secondary">Date left: </strong>{employee.date_left}</p>
                  <p className="mb-2"><strong className="fw-bold text-secondary">Duties:</strong> {employee.duties}</p>
                  <div className="card-actions">
                    <Link to={`/employeeDetails/${employee.employee_id}`} className="action-link">
                    <button type="button" class="btn btn-secondary m-2">View</button>
                    </Link>
                    <Link to={`/update_employee/${employee.employee_id}`} className="action-link">
                    <button type="button" class="btn btn-secondary m-2">Edit</button>
                    </Link>
                    
                    <Link to={`/viewHistory/${employee.national_id}`} className="action-link">
                    <button type="button" class="btn btn-secondary m-2">View History</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <nav>
          <ul className="pagination justify-content-center">
            {Array(Math.ceil(employees.length / employeesPerPage))
              .fill()
              .map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
          </section>
        </div>
      );
}

export default Employees;