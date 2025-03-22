import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployees } from "../services/EmployeeService";

const ViewEmployeeComponent = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employees = await getEmployees();
      const foundEmployee = employees.find((emp) => emp.id === parseInt(id));
      if (foundEmployee) setEmployee(foundEmployee);
      setLoading(false);
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p className="text-center">Loading employee details...</p>;

  return (
    <section className="container">
      <article className="card col-md-6 offset-md-3 mt-3">
        <h2 className="text-center">View Employee Details</h2>
        <div className="card-body">
          <div className="row">
            <label className="fw-bold">Employee First Name:</label>
            <div>{employee?.firstName || "N/A"}</div>
          </div>
          <div className="row">
            <label className="fw-bold">Employee Last Name:</label>
            <div>{employee?.lastName || "N/A"}</div>
          </div>
          <div className="row">
            <label className="fw-bold">Employee Email Address:</label>
            <div>{employee?.emailAddress || "N/A"}</div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ViewEmployeeComponent;
