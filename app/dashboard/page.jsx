"use client"

import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

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
    Swal.fire({
      title: "Sign Out!",
      text: "Are you sure!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sign Out!",
          icon: "success",
        });
        signOut();
      }
    });
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
        `/api/checkIn?shift=${shift}&month=${month}`,
        { cache: "no-store" }
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

  const isDateBeforeToday = (dateString) => {
    const today = new Date();
    const [day, month] = dateString.split("/").map(Number);
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear(); // Get the current year for consistency
    const currentDate = new Date(currentYear, month - 1, day); // month - 1 because months are zero-indexed in JavaScript
    const currentDay = today.getDate();

    // Check if the date is a Sunday
    if (currentDate.getDay() === 0) {
      console.log("It's a Sunday!");
      return "Holiday";
    }

    // Check if the date is before today
    if ( month < currentMonth || (month === currentMonth && day < currentDay)) {
      return "Absent";
    }

    // If the date is today or in the future
    return "-";
  };

  const exportToExcel = () => {
    // Create an object to store the transformed data
    const excelData = {};
  
    // Iterate over the result data to populate the excelData object
    result?.forEach((entry) => {
      const userId = entry.userId.name;
      const date = entry.date;
      const time = entry.time;
  
      if (!excelData[userId]) {
        excelData[userId] = {};
      }
  
      // Store the time for the corresponding date and user
      excelData[userId][date] = time || isDateBeforeToday(date);
    });
  
    // Create an array of users with their corresponding check-in times for each date
    const excelArray = Object.keys(excelData)?.map((userId) => {
      const userData = {
        Users: userId,
        ...dates?.reduce((acc, date) => {
          acc[date] = excelData[userId][date] === undefined ? "-" : excelData[userId][date];
          return acc;
        }, {}),
      };
      return userData;
    });
  
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelArray);
  
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Save file
    XLSX.writeFile(wb, "result.xlsx");
  };     

  return (
    <div className="min-h-screen">
      {session?.data?.type === "admin" ? (
        <div>
          <Navbar handleOnClick={handleSignOut} content={"Sign Out"} />
          <div className="pt-10 flex justify-between">
            <div className="flex gap-4 mb-4 items-center text-white">
              <div>
                <label htmlFor="shift" className="font-semibold">
                  Shift:
                </label>
                <select
                  id="shift"
                  value={shift}
                  className="text-black p-2 rounded-lg ms-2 py-[10px] "
                  onChange={(e) => setShift(e.target.value)}
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>
              <div>
                <label htmlFor="month" className="font-semibold">
                  Month:
                </label>
                <input
                  type="text"
                  id="month"
                  className="text-black p-2 rounded-lg ms-2 py-[10px]"
                  value={month}
                  onChange={handleMonthChange}
                />
              </div>
              <div>
                <Button handleOnClick={handleShowResult}>Show Result</Button>
              </div>
              <div>
                <Button handleOnClick={exportToExcel}>Export to Excel</Button>
              </div>
            </div>
            <div>
              <Button handleOnClick={handleOnClick}>Employees</Button>
            </div>
          </div>
          {result && (
            <div className="overflow-x-auto text-white border border-neutral-500 rounded-lg mt-8 employee_table pb-[4px]">
              <table className="border-collapse p-2 overflow-x-scroll">
                <thead>
                  <tr className="text-neutral-400">
                    <th className="p-2 px-32 ps-2 py-[10px] text-left">Users</th>
                    {dates.map((date) => (
                      <th
                        key={date}
                        className="p-2 px-32 ps-2 py-[10px]"
                      >
                        {date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.values(
                    result.reduce((acc, cur) => {
                      const key = cur.userId._id; // Use user ID as the key
                      if (!acc[key]) {
                        acc[key] = { user: cur.userId.name, checkIns: {} };
                      }
                      // Store check-ins by date for each user
                      acc[key].checkIns[cur.date] = cur.time;
                      return acc;
                    }, {})
                  ).map((userData) => (
                    <tr key={userData.user} className="border-t border-neutral-500 text-sm hover:bg-black/30 cursor-pointer">
                      <td className="ps-2 capitalize">
                        {userData.user}
                      </td>
                      {dates.map((date) => (
                        <td
                          key={`${userData.user}-${date}`}
                          className="p-2 py-[10px] text-left"
                        >
                          {userData.checkIns[date]
                            ? userData.checkIns[date]
                            : isDateBeforeToday(date) === "Holiday"
                            ? "Holiday"
                            : isDateBeforeToday(date) === "Absent"
                            ? "Absent"
                            : "---"}
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
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
