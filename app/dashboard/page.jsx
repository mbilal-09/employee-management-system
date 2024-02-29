"use client";

import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [shift, setShift] = useState("");
  const [month, setMonth] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" || session?.data?.type === "employee") {
      router.push("/");
    }
  }, [status, router]);

  const handleOnClick = () => {
    router.push("/employee");
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleShowResult = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/checkIn?shift=${shift}&month=${month}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    const capitalizedMonth =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setMonth(capitalizedMonth);
  };

  function getDatesForMonth(monthName) {
    // Create a date object with the first day of the given month
    const startDate = new Date(`1 ${monthName}`);

    // Get the month value (0-indexed, so January is 0)
    const month = startDate.getMonth();

    // Initialize an empty array to store the dates
    const dates = [];

    // Loop through each day of the month
    while (startDate.getMonth() === month) {
      // Format the date as "MM/DD"
      const formattedDate = `${String(startDate.getDate()).padStart(
        2,
        "0"
      )}/${String(month + 1).padStart(2, "0")}`;

      // Push the formatted date to the array
      dates.push(formattedDate);

      // Move to the next day
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  }

  const monthName = "January";
  const dates = getDatesForMonth(monthName);
  console.log(dates);

  return (
    <div>
      {session?.data?.type === "admin" ? (
        <div>
          <Navbar handleOnClick={handleSignOut} content={"Sign Out"} />
          <div className="p-3 flex justify-between">
            <div className="flex gap-4 mb-4 items-center">
              <div>
                <label htmlFor="shift">Shift:</label>
                <select
                  id="shift"
                  value={shift}
                  className="text-black p-2 rounded-lg ms-2"
                  onChange={(e) => setShift(e.target.value)}
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>
              <div>
                <label htmlFor="month">Month:</label>
                <input
                  type="text"
                  id="month"
                  className="text-black p-2 rounded-lg ms-2"
                  value={month}
                  onChange={handleMonthChange}
                />
              </div>
              <div>
                <Button handleOnClick={handleShowResult}>Show Result</Button>
              </div>
            </div>
            <div>
              <Button handleOnClick={handleOnClick}>Employees</Button>
            </div>
          </div>
          {result && (
            <table className="border-collapse border border-gray-800">
              <thead>
                <tr>
                  <th className="border border-gray-800">User</th>
                  {result.map((entry) => (
                    <th key={entry.date} className="border border-gray-800">
                      {entry.date.includes(month) ? entry.date : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result[0].userId &&
                  result.map((user) => (
                    <tr key={user.userId._id}>
                      <td className="border border-gray-800">
                        {user.userId.name}
                      </td>
                      {result.map((entry) => (
                        <td
                          key={`${user.userId._id}-${entry.date}`}
                          className="border border-gray-800"
                        >
                          {entry.userId &&
                            entry.userId.name === user.userId.name &&
                            entry.time}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Dashboard;
