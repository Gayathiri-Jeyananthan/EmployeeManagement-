import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const refreshEmployees = () => {
    fetchEmployees();
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <EmployeeForm 
        employee={selectedEmployee} 
        setEmployee={setSelectedEmployee} 
        refreshEmployees={refreshEmployees} 
      />
      <EmployeeTable 
        employees={employees} 
        setEmployee={setSelectedEmployee} 
      />
    </div>
  );
};

export default App;
