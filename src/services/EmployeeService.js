import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEmployees = async () => {
  try {
    const response = await apiClient.get("/employees"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await apiClient.post("/employees", employee);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const updateEmployee = async (updatedEmployee) => {
  try {
    const response = await apiClient.put("/employees", updatedEmployee); 
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await apiClient.delete(`/employees/${id}`); 
    return Promise.resolve();
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};

// New function to delete employee by object (matching backend API)
export const deleteEmployeeByObject = async (employee) => {
  try {
    await apiClient.post("/employees/delete", employee);
    return Promise.resolve();
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

/*
const employees = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com" },
  { id: 3, firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com" },
];

export const getEmployees = async () => Promise.resolve([...employees]);

export const addEmployee = async (employee) => {
  const newEmployee = { id: employees.length + 1, ...employee };
  employees.push(newEmployee);
  return Promise.resolve(newEmployee);
};

export const updateEmployee = async (id, updatedEmployee) => {
  employees.forEach((employee, index) => {
    if (employee.id === id) employees[index] = { ...employee, ...updatedEmployee };
  });
  return Promise.resolve(updatedEmployee);
};

export const deleteEmployee = async (id) => {
  const filteredEmployees = employees.filter((employee) => employee.id !== id);
  employees.length = 0; // 기존 배열 비우기
  employees.push(...filteredEmployees);
  return Promise.resolve();
};
*/