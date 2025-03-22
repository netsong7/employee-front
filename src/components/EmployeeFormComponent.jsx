import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, updateEmployee, getEmployees } from "../services/EmployeeService";

const EmployeeFormComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
  });

  useEffect(() => {
    if (isEdit) {
      const fetchEmployee = async () => {
        const employees = await getEmployees();
        const foundEmployee = employees.find((emp) => emp.id === parseInt(id));
        if (foundEmployee) setEmployee(foundEmployee);
      };
      fetchEmployee();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      if (!employee.id) {
        alert("ID가 없습니다. 업데이트할 수 없습니다.");
        return;
      }
      try {
        await updateEmployee(employee);
        alert("직원 정보가 업데이트되었습니다!");
        navigate("/employees");
      } catch (error) {
        console.error("직원 정보 업데이트 중 오류 발생:", error);
        alert("업데이트 중 오류가 발생했습니다.");
      }
    } else {
      await addEmployee(employee);
    }
    navigate("/employees");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded">
            <div className="card-header bg-primary text-white text-center">
              <h2>{isEdit ? "Update Employee" : "Add Employee"}</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter first name"
                    value={employee.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter last name"
                    value={employee.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address:</label>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    placeholder="Enter email"
                    value={employee.emailAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-save"></i> Save
                  </button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/employees")}>
                    <i className="bi bi-arrow-left"></i> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormComponent;
