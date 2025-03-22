import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeFormComponent from "./components/EmployeeFormComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";

const App = () => {
  return (
    <Router>
      <HeaderComponent />
      <main className="container">
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<EmployeeFormComponent />} />
          <Route path="/update-employee/:id" element={<EmployeeFormComponent />} />
          <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
        </Routes>
      </main>
      <FooterComponent />
    </Router>
  );
};

export default App;