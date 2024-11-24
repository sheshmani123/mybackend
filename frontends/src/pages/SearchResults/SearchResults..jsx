import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SearchResults.css"; // Make sure you have the right CSS file for styling

const SearchResults = () => {
  const location = useLocation(); // Get location object, which contains passed data
  const { data, query } = location.state || {}; // Access the search results and query
  const [filteredResults, setFilteredResults] = useState(data || []); // Store filtered results

  useEffect(() => {
    // If data exists, filter based on query (although the data should already be filtered from Navbar)
    if (data && query) {
      // Filter based on ID, Name, Course, and Email
      const filteredData = data.filter(employee => 
        employee.f_Id.toString().includes(query) || // Check ID
        employee.f_Name.toLowerCase().includes(query.toLowerCase()) || // Check Name
        employee.f_Course.toLowerCase().includes(query.toLowerCase()) || // Check Course
        employee.f_Email.toLowerCase().includes(query.toLowerCase()) // Check Email
      );
      setFilteredResults(filteredData);
    }
  }, [data, query]); // Re-filter when data or query changes

  return (
    <div className="container">
      <h1>Search Results</h1>
      
      {/* Display search query */}
      <p>Results for: <strong>{query}</strong></p>
      
      {/* Display filtered results */}
      {filteredResults.length > 0 ? (
        <table>
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
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((employee, index) => (
              <tr key={index}>
                <td>{employee.f_Id}</td>
                <td>{employee.f_Name}</td>
                <td><img src={employee.f_Image} alt={employee.f_Name} /></td>
                <td>{employee.f_Course}</td>
                <td>{employee.f_Gender}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">No results found</p> // Message when no results are found
      )}
    </div>
  );
};

export default SearchResults;
