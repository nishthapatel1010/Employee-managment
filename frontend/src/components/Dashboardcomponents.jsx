import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await axios.put(
          `http://localhost:5000/api/employees/${editingEmployee._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:5000/api/employees", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ name: "", position: "", department: "", salary: "" });
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
        Employee Management Dashboard
      </h1>

      {/* Form Section */}
      <div className="max-w-full sm:max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>

      {/* Employee List */}
      <div className="max-w-full sm:max-w-5xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Employees</h2>

        {/* Desktop Table */}
        <table className="hidden sm:table w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Position</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Salary</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.position}</td>
                <td className="p-2 border">{emp.department}</td>
                <td className="p-2 border">₹{emp.salary}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card Layout */}
       {/* Mobile Card Layout */}
<div className="sm:hidden flex flex-col gap-4">
  {employees.map((emp) => (
    <div
      key={emp._id}
      className="bg-blue-50 rounded-lg p-4 border border-blue-200"
    >
      <h3 className="font-bold text-lg mb-2 text-blue-800">{emp.name}</h3>
      <p className="text-gray-700">
        <strong>Position:</strong> {emp.position}
      </p>
      <p className="text-gray-700">
        <strong>Department:</strong> {emp.department}
      </p>
      <p className="text-gray-700">
        <strong>Salary:</strong> ₹{emp.salary}
      </p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => handleEdit(emp)}
          className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(emp._id)}
          className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Dashboard;
