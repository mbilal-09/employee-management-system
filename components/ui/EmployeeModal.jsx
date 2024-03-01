import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Swal from 'sweetalert2'

const EmployeeModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shift: "morning", // Default to morning shift
  });

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
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill al the fields first',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
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
        Swal.fire({
          title: 'Success!',
          text: 'Employee added successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Employee"
      className="modal bg-gradient-to-t from-[--primary] to-[--secondary] border-2 text-white border-white rounded-lg p-4 m-4 w-1/2 mx-auto fixed top-10 left-1/4"
      overlayClassName="overlay"
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
            className="w-full p-2 border border-black rounded text-black"
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
            className="w-full p-2 border rounded border-black text-black"
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
            className="w-full p-2 border rounded border-black text-black"
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
              <label htmlFor="morning">
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
              <label htmlFor="evening">
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
              <label htmlFor="night">
                Night
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button handleOnClick={closeModal}>Cancel</Button>
          <button
            type="submit"
            className="bg-white text-[--primary] border-2 py-2 px-4 rounded-lg font-medium hover:bg-transparent hover:text-white transition-all delay-75 duration-700"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeModal;
