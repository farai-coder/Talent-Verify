import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CompanySearchBar({ onSearchInputChange }) {
  const [searchInput, setSearchInput] = useState(""); // Add a state variable to store the search input value

  const handleSearchInputChange = (event) => {
    const newSearchParameter = event.target.value;
    setSearchInput(newSearchParameter); // Update the state variable
    onSearchInputChange(newSearchParameter);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <div className="input-group">
            <input
              className="form-control border-secondary py-2 shadow-lg"
              type="search"
              placeholder="Search company by name or registration number"
              value={searchInput} // Set the input value to the state variable
              onChange={handleSearchInputChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary p-1 shadow-lg" type="button" style={{ height: '34px', width: '50', borderRadius: '1px' }}>
                <i className="fa fa-search fw-bold"></i>
              </button>
            </div>
            <div className="input-group-append ms-5">
              <Link to={`/add_company`} className="action-link">
                <button className="btn btn-outline-secondary p-1 mt-2 shadow-lg" type="button">
                  <i className="">Add company</i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanySearchBar;