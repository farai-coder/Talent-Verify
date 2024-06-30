import React from "react";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyDetails from "./companies/CompanyDetails";
import Employees from "./employees/Employees";
import Companies from "./companies/Companies";
import EmployeeDetails from "./employees/EmployeeDetails";
import EmployeeHistory from "./employees/EmployeeHistory";
import AddEmployee from "./employees/AddEmployee";
import AddCompany from "./companies/AddCompany";
import EditCompany from "./companies/EditCompany";
import BulkUpload from "./BulkUpload";
import SignIn from "./Login2";
import SignUp from "./SignUp2";
import AuthDetails from "./AuthoDetails";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import Protected from "./Protected";
import EditEmployee from "./employees/EditEmployee";

export default function App (){
  
    return (
        <AuthContext>
          <Router>
            <NavBar/>

            <Routes>
              <Route 
                  exact 
                  path="/"
                  element={<HomePage/>}></Route>
              
              <Route 
                exact 
                path="/companies"
                element={<Protected><Companies/></Protected>}></Route>
              <Route 
                exact
                path="/employees"
                element={<Protected><Employees/></Protected>}></Route>
              <Route
                exact 
                path="/upload" 
                element={<Protected><BulkUpload/></Protected>}></Route>
              <Route
                exact 
                path="/companyDetails/:id"
                element={<Protected><CompanyDetails/></Protected>}></Route>
              <Route
                exact 
                path="/employeeDetails/:id"
                element={<Protected><EmployeeDetails/></Protected>}></Route>
              <Route
                exact 
                path="/deleteCompany/:id"
                element={<Protected><Companies/></Protected>}></Route>
              <Route
                exact 
                path="/updateCompany/:id"
                element={<Protected><EditCompany/></Protected>}></Route>
              <Route
                exact 
                path="/update_employee/:id"
                element={<Protected><EditEmployee/></Protected>}></Route>
            
              <Route
                exact 
                path="/add_employee"
                element={<Protected><AddEmployee/></Protected>}></Route>
              <Route
                exact 
                path="/add_company"
                element={<Protected><AddCompany/></Protected>}></Route>
              <Route
                exact 
                path="/viewHistory/:id"
                element={<Protected><EmployeeHistory/></Protected>}></Route>

              <Route
                exact 
                path="/login"
                element={<SignIn/>}></Route>
              <Route
                exact 
                path="/sign_up"
                element={<SignUp/>}></Route>
              <Route
                exact 
                path="/log_out"
                element={<AuthDetails/>}></Route>
            </Routes>
          </Router>
        </AuthContext>
    )
};