"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ReactModal from "react-modal";
import Navbar from "@/components/layout/Navbar";
import EmployeeModal from "@/components/ui/EmployeeModal";
import Dropdown from "@/components/ui/Dropdown";
import UserList from "@/components/ui/UserList";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDropdownChange = async (value) => {
    setSelectedShift(value);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user?type=${value}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      console.log(response);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || session?.data?.type === "employee") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    // Set the body overflow style when the modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Clean up the style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="h-screen">
      {session?.data?.type === "admin" ? (
        <div>
          <Navbar handleOnClick={handleAdd} content={"Add Employee"} />
          <EmployeeModal isOpen={isModalOpen} closeModal={closeModal} />
          <Dropdown onChange={handleDropdownChange} />
          <br />
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <UserList users={users} onDelete={handleDeleteUser} />
          )}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Employee;
