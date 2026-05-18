import { Users } from "lucide-react";


type User = {
  _id: string;
  name: string;
  role: string;
  isDelete: boolean;
  birth_date: string;
  createdAt: string;
};

type Props = {
  users: User[];
};

export default function Recent({ users }: Props) {
  return (
    <div className="w-full h-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl w-fit border border-gray-100 shadow-sm ml-4">
        <Users className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-semibold tracking-wide text-gray-700 uppercase">Recent Users</span>
      </div>
      <table className="w-full text-sm text-left border-collapse">

        <thead className="bg-gray-50 text-gray-500  text-sm  border-b border-gray-100">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Birth Date</th>
            <th className="p-4">Created</th>
          </tr>
        </thead>

        {/* টেবিল বডি */}
        <tbody className="divide-y divide-gray-50 text-gray-700">
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50/70 transition-colors duration-200 ease-in-out"
              >
                {/* নাম */}
                <td className="p-4 font-medium text-gray-900">{user.name}</td>

                {/* রোল */}
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                    {user.role}
                  </span>
                </td>

                {/* স্ট্যাটাস */}
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.isDelete
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100"
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.isDelete ? "bg-red-500" : "bg-emerald-500"}`}></span>
                    {user.isDelete ? "Deleted" : "Active"}
                  </span>
                </td>

                {/* জন্ম তারিখ */}
                <td className="p-4 text-gray-500">
                  {user.birth_date ? new Date(user.birth_date).toLocaleDateString() : "N/A"}
                </td>

                {/* তৈরি করার তারিখ */}
                <td className="p-4 text-gray-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            /* কোনো ইউজার না থাকলে এই রো দেখাবে */
            <tr>
              <td colSpan={6} className="p-8 text-center text-gray-400 italic">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}