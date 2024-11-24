import React, { useEffect, useState } from "react";
import "./List.css";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    f_Id: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: "",
    f_Image: "",
  });

  // Fetch data from the API
  const fetchEmployees = () => {
    fetch("http://localhost:4000/api/employee/all")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  useEffect(() => {
    fetchEmployees(); // Initial fetch to load employee list
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      // Update existing employee
      fetch(`http://localhost:4000/api/employee/update/${formData.f_Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Employee updated:", data);
          fetchEmployees(); // Re-fetch the employee list after update

          setShowForm(false);
          setIsEditMode(false);
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    } else {
      // Create a new employee
      fetch("http://localhost:4000/api/employee/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Employee created:", data);
          fetchEmployees(); // Re-fetch the employee list after creation

          setShowForm(false);
          resetForm();
        })
        .catch((error) => {
          console.error("Error creating employee:", error);
        });
    }
  };

  const handleUpdate = (id) => {
    // Find the employee data to prefill the form
    const employeeToUpdate = employees.find((employee) => employee._id === id);
    if (employeeToUpdate) {
      setFormData(employeeToUpdate);
      setShowForm(true);
      setIsEditMode(true); // Enable edit mode
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete Employee with ID: ${id} `)) {
      fetch(`http://localhost:4000/api/employee/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          console.log(`Employee with ID: ${id}) has been deleted.`);

          fetchEmployees(); // Re-fetch the employee list after deletion
        })
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  const resetForm = () => {
    setFormData({
      f_Id: "",
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_Gender: "",
      f_Course: "",
      f_Image: "",
    });
  };

  return (
    <div className="employee-list-container">
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Employee List !😎😎</h1>

      <button className="create-employee-btn" onClick={() => { setShowForm(true); setIsEditMode(false); }}>
        Create Employee
      </button>

      {showForm && (
        <div className="create-employee-form">
          <h2>{isEditMode ? "Update Employee" : "Create New Employee"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              ID:
              <input
                type="text"
                name="f_Id"
                value={formData.f_Id}
                onChange={handleInputChange}
                required
                disabled={isEditMode} // Disable ID field in edit mode
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                name="f_Name"
                value={formData.f_Name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="f_Email"
                value={formData.f_Email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Mobile:
              <input
                type="text"
                name="f_Mobile"
                value={formData.f_Mobile}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Designation:
              <input
                type="text"
                name="f_Designation"
                value={formData.f_Designation}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Gender:
              <select
                name="f_Gender"
                value={formData.f_Gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Course:
              <input
                type="text"
                name="f_Course"
                value={formData.f_Course}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Image:
              <input
                type="file"
                name="f_Image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">{isEditMode ? "Update" : "Submit"}</button>
            <button type="button" onClick={() => { setShowForm(false); resetForm(); }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Course</th>
            <th>Gender</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.f_Id}</td>
              <td>{employee.f_Name}</td>
              <td>
                {employee.f_Image && (
                  <img
                    src={employee.f_Image}
                    alt={employee.f_Name}
                    className="employee-image"
                  />
                )}
              </td>
              <td>{employee.f_Course}</td>
              <td>{employee.f_Gender}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_Email}</td>
              <td>{employee.f_Mobile}</td>
              <td className="action-buttons">
                <button className="update-btn" onClick={() => handleUpdate(employee._id)}>
                  Update
                </button>
                <button className="delete-btn" onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
