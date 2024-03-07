import Button from "./Button";
import Swal from "sweetalert2";

const UserList = ({ users, onDelete }) => {
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`/api/user/${id}`, { method: "DELETE" });
          onDelete(id);
        } catch (error) {
          console.error("Error deleting user:", error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <table className="p-4 mt-4 w-full text-sm">
      <thead>
        <tr className="text-neutral-400 text-left border-b border-neutral-500">
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Shift</th>
          <th className="py-2 px-4">Type</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="text-white border-b border-neutral-500">
            <td className="py-2 px-4 capitalize">{user.name}</td>
            <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4 capitalize">{user.shift}</td>
            <td className="py-2 px-4 capitalize">{user.type}</td>
            <td className="py-2 px-4">
              <Button handleOnClick={() => handleDelete(user._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
