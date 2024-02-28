"use client"

import { useState } from 'react';
import Button from '@/components/ui/Button';
import ReactModal from 'react-modal';

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-3 mb-8">
        <div className="text-lg">DigiApps Solutions</div>
        <div>
          <Button handleOnClick={handleAdd}>Add Employee</Button>
        </div>
      </nav>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Employee Modal"
        className="modal bg-black border border-white rounded-lg p-4 m-4"
        overlayClassName="overlay"
      >
        <h2 className="ps-4 font-semibold">Add Employee</h2>
        <form className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input type="text" id="name" name="name" className="w-full p-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input type="email" id="email" name="email" className="w-full p-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input type="password" id="password" name="password" className="w-full p-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="shift" className="block mb-1">Shift:</label>
            <select id="shift" name="shift" className="w-full p-2 border rounded text-black">
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <Button handleOnClick={closeModal}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default Employee;
