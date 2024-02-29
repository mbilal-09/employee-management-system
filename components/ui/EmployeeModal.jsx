import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";

const EmployeeModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shift: "morning", // Default to morning shift
  });

  useEffect(() => {
    // Set the app element when the component mounts
    Modal.setAppElement('#employeeModal');
  }, []);

  useEffect(() => {
    // Reset form data when modal is opened
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        password: '',
        shift: 'morning', // Reset to default shift
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Employee added successfully!");
        closeModal();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const customStyles = {
    content: {
      transform: 'translate(0%, -25%)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Employee"
      className="modal bg-black border border-white rounded-lg p-4 m-4"
      overlayClassName="overlay"
      style={customStyles}
    >
      <h2 className="ps-4 font-semibold">Add Employee</h2>
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <span className="block mb-1">Shift:</span>
          <div className="flex">
            <div className="mr-4">
              <input
                type="radio"
                id="morning"
                name="shift"
                value="morning"
                checked={formData.shift === "morning"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="morning" className="text-white">
                Morning
              </label>
            </div>
            <div className="mr-4">
              <input
                type="radio"
                id="evening"
                name="shift"
                value="evening"
                checked={formData.shift === "evening"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="evening" className="text-white">
                Evening
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="night"
                name="shift"
                value="night"
                checked={formData.shift === "night"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="night" className="text-white">
                Night
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button handleOnClick={closeModal}>Cancel</Button>
          <button
            type="submit"
            className="bg-white text-black py-2 px-4 rounded-lg font-medium"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeModal;
