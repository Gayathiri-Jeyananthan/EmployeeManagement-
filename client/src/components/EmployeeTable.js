import React from 'react';
import axios from 'axios';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, setEmployee }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td>{employee.office}</td>
            <td>{employee.salary}</td>
            <td>
              <button className="edit" onClick={() => setEmployee(employee)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(employee._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
