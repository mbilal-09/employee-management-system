const UserList = ({ users, onDelete }) => {
    const handleDelete = async (id) => {
      try {
        await fetch(`/api/user/${id}`, { method: 'DELETE' });
        onDelete(id);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  
    return (
        <table className="p-4 mt-4 w-full">
        <thead>
          <tr className="text-white text-left border-b border-white">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Shift</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-white border-b border-white">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.shift}</td>
              <td className="py-2 px-4">
                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default UserList;
  