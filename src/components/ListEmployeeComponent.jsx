import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-primary">Employee List</h2>
        <button className="btn btn-success" onClick={() => navigate("/add-employee")}>
          <i className="bi bi-person-plus-fill"></i> Add Employee
        </button>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td className="text-center">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/update-employee/${employee.id}`)}>
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.id)}>
                    <i className="bi bi-trash-fill"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
