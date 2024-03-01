import { useState, useEffect } from "react";

const Dropdown = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/user?type=${selectedValue}`, {
        cache: "no-store",
      });
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="bg-transparent text-white ms-2 border-2 p-2 rounded-lg"
    >
      <option value="" className="text-black">
        Select Shift
      </option>
      <option value="morning" className="text-black">
        Morning
      </option>
      <option value="evening" className="text-black">
        Evening
      </option>
      <option value="night" className="text-black">
        Night
      </option>
    </select>
  );
};

export default Dropdown;
