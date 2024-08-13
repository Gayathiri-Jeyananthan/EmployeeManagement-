import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, setEmployee, refreshEmployees }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [office, setOffice] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
      setOffice(employee.office);
      setSalary(employee.salary);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee) {
        await axios.patch(`http://localhost:8000/employees/${employee._id}`, {
          name,
          position,
          office,
          salary,
        });
      } else {
        await axios.post('http://localhost:8000/employees', {
          name,
          position,
          office,
          salary,
        });
      }
      refreshEmployees();
      setEmployee(null);
      setName('');
      setPosition('');
      setOffice('');
      setSalary('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="employee-form">
      <h2>{employee ? 'Update Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
        />
        <input
          type="text"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          placeholder="Office"
        />
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary"
        />
        <button type="submit">{employee ? 'Update' : 'Add'} Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
