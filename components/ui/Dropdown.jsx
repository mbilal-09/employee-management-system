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
      className="bg-transparent text-neutral-300 ms-2 border-2 border-neutral-300 p-2 rounded-lg "
    >
      <option value="" className="text-neutral-300 bg-black/90">
        Select Shift
      </option>
      <option value="morning" className="text-neutral-300 bg-black/90">
        Morning
      </option>
      <option value="evening" className="text-neutral-300 bg-black/90">
        Evening
      </option>
      <option value="night" className="text-neutral-300 bg-black/90">
        Night
      </option>
    </select>
  );
};

export default Dropdown;
