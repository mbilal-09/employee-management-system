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
  const [shift, setShift] = useState("morning");
  const [month, setMonth] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([]);

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

  const handleMonthChange = (e) => {
    const capitalizedMonth =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setMonth(capitalizedMonth);
  };

  const getDatesForMonth = (monthName) => {
    // Create a date object with the first day of the given month
    const startDate = new Date(`1 ${monthName}`);

    // Get the month value (0-indexed, so January is 0)
    const month = startDate.getMonth();

    // Initialize an empty array to store the dates
    const monthDates = [];

    // Loop through each day of the month
    while (startDate.getMonth() === month) {
      // Format the date as "MM/DD"
      const formattedDate = `${String(startDate.getDate()).padStart(
        2,
        "0"
      )}/${String(month + 1).padStart(2, "0")}`;

      // Push the formatted date to the array
      monthDates.push(formattedDate);

      // Move to the next day
      startDate.setDate(startDate.getDate() + 1);
    }

    setDates(monthDates);
  };

  const handleShowResult = async () => {
    setLoading(true);
    getDatesForMonth(month);
    try {
      const response = await fetch(
        `/api/checkIn?shift=${shift}&month=${month}`, { cache: "no-store" }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResult(data);
      console.log("result ->", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCheckInTime = (user, date) => {
    result.map((element) => {
      if (element.userId.email === user.userId.email && element.date === date) {
        console.log(element.time);
        return element.time;
      } else {
        return "-";
      }
    });
  };

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
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-300 p-2 overflow-x-scroll">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 px-10">Users</th>
                    {dates.map((date) => (
                      <th key={date} className="border border-gray-300 p-2 px-10">
                        {date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result &&
                    result.map((user) => (
                      <tr key={user._id}>
                        <td className="border border-gray-300 ps-2">
                          {user.userId.name}
                        </td>
                        {dates.map((entry) => (
                          <td
                            key={`${user.userId._id}-${entry}`}
                            className="border border-gray-300 text-white p-2 text-center"
                          >
                            {result
                              .map((element) => {
                                if (
                                  element.userId.email === user.userId.email &&
                                  element.date === entry
                                ) {
                                  return element.time; // Return only the time if condition is met
                                } else {
                                  return null; // Return null for entries where condition is not met
                                }
                              })
                              .filter((time) => time !== null) // Filter out null values
                              .join(", ") || "-"}{" "}
                            {/* Join multiple times with comma or show "-" if no times */}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Dashboard;
