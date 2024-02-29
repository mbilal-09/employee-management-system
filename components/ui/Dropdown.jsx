import { useState, useEffect } from 'react';

const Dropdown = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/user?type=${selectedValue}`, { cache: 'no-store' });
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select value={selectedValue} onChange={handleChange} className='bg-black ms-2 border p-2 rounded-lg'>
      <option value="">Select Shift</option>
      <option value="morning">Morning</option>
      <option value="evening">Evening</option>
      <option value="night">Night</option>
    </select>
  );
};

export default Dropdown;
