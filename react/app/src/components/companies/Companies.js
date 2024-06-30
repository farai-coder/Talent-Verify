import React from "react";
import { useState } from "react";
// import {FaTrashAlt,FaEye, FaEdit, FaSms, FaHome, FaTrash} from "react-icons/fa"
// import { AiFillMessage, AiOutlineCamera} from "react-icons/ai";
import {Link} from "react-router-dom"
import "../App.css"
import axios from "axios"
import { useEffect } from "react";
import CompanySearchBar from "./ComapanySearchBar";

function Companies() {
    const [search, setSearch] = useState("")
    const [searchParameter, setSearchParameter] = useState('');
    const [companies, setCompany] = useState([])

    const [FormData,setFormData] = useState({
        firstName: "",
        email: ""
    }) 
    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage] = useState(2); // Number of companies to display per page
    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

    const handleSearchInputChange = (newSearchParameter) => {
      setSearchParameter(newSearchParameter);
      console.log('search from bar', searchParameter)
      console.log('seach in bar', newSearchParameter)
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChang = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to the first page when search changes
    };

    async function loadComapnies(){
        axios.get(
            "http://localhost:8000/playground/companies"
            ).then(function (response) {
                setCompany(response.data)
            });
    }

   useEffect(() => {
        loadComapnies();
    }, []);
    console.log('companies', companies)

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

    const filteredCompanies = companies.filter((company) => {
      const name = company.name.toLowerCase();
      const registrationNumber = company.registration_number.toString();
      const searchQuery = searchParameter
  
      return (
        name.includes(searchQuery) || registrationNumber.includes(searchQuery)
      );
    });
    

    return (
        <div className="container  " style={{  }}>
          <CompanySearchBar onSearchInputChange={handleSearchInputChange}/>
          <section className="mt-5">
            
            <div className="row row-cols-1 row-cols-md-4 g-4 ">
              {filteredCompanies.map((company, index) => (
                <div key={company.ID} className="card h-400 m-4 p-4 border shadow-lg">
                  <h5 className="fw-bold">{company.name}</h5>
                  <p className="mt-3 mb-1"><strong className="fw-bold text-secondary">Date Of Registration:</strong> {company.date_of_registration}</p>
                  <p className="mb-2"><stong className="fw-bold text-secondary">Company Registration Number:</stong> {company.registration_number}</p>
                  <p className="mb-2"><strong className="fw-bold text-secondary">Address: </strong>{company.address}</p>
                  <p className="mb-2"><strong className="fw-bold text-secondary">Contact Person:</strong> {company.contact_person}</p>
                  <div className="card-actions">
                    <Link to={`/companyDetails/${company.registration_number}`} className="action-link">
                    <button type="button" class="btn btn-secondary m-2">View</button>
                    </Link>
                    <Link to={`/updateCompany/${company.registration_number}`} className="action-link">
                    <button type="button" class="btn btn-secondary m-2">Edit</button>
                    </Link>
                    {/* <Link to="/deleteCompany" className="action-link">
                    <button type="button" class="btn btn-secondary m-2">Delete</button>
                    </Link> */}
                  </div>
                </div>
              ))}
            </div>
            <nav>
          <ul className="pagination justify-content-center">
            {Array(Math.ceil(companies.length / companiesPerPage))
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

export default Companies;