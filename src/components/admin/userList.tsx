"use client";
import {
  blockUser,
  deleteUser,
  fetchAllUser,
} from "@/redux/actions/admin/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Ban,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ListSkeleton from "./skelton/tableSkelton";
import axiosErrorManager from "@/utils/axiosErrorManager";
import SpringModal from "./ui/springModal";

interface UserListProps {
  search: string;
  role: string;
}

const UserList: React.FC<UserListProps> = ({ search, role }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [selectedUser,setSelectedUser] = useState<string>("")
  const { users, totalUsers, loading } = useAppSelector(
    (state) => state.adminUsers
  );

  useEffect(() => {
    dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
  }, [dispatch, currentPage, search, role]);

  const itemsPerPage = 5;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalUsers || 0);
  const totalPages = Math.ceil((totalUsers || 0) / itemsPerPage);

  const blockUserById = async (id: string) => {
    try {
      await dispatch(blockUser({ id })).unwrap();
      dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }));
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };

  const deleteAUser = async (id: string) => {
    dispatch(deleteUser({ id }))
      .unwrap()
      .then(() =>
        dispatch(fetchAllUser({ page: currentPage, limit: 5, search, role }))
      )
      .catch((err) => {
        axiosErrorManager(err);
      });
  };

  return (
    <div className="w-full bg-white rounded-lg">
      {/* Table */}
      <div className="overflow-x-auto w-full">
        {users?.length === 0 ? (
          <div className="w-full p-12 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="mt-4 text-gray-600 font-medium">No users found</p>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    User Name
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Email
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Phone Number
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Role
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Status
                  </div>
                </th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            {loading ? (
              <ListSkeleton />
            ) : (
              <tbody>
                {users.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium relative">
                          {/* {item?.image (
                          <Image
                            src={item.image[0]}
                            fill
                            alt={item.name}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <span className="text-xs">No Img</span>
                          </div>
                        )} */}
                          {item.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-800">
                            {item?.username}
                          </div>
                          {/* <div className="text-xs text-gray-500">
                          {item?.address}
                        </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{item?.email}</td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {"+91 0000000000"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{item?.role}</td>
                    <td className="p-4">
                      {item.isBlocked ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5"></span>
                          Banned
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                          Active
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="dropdown dropdown-left">
                          <button
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                            title="More options"
                          >
                            <EllipsisVertical
                              size={18}
                              className="text-gray-500"
                            />
                          </button>
                          <ul
                            tabIndex={0}
                            className={`dropdown-content menu shadow-lg bg-white rounded-lg p-2 w-48 border border-gray-100 ${
                              isOpen ? "hidden" : "block"
                            }`}
                          >
                            <li>
                              <button
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                onClick={() => {
                                  setSelectedUser(item._id)
                                  setIsOpen(true);
                                  setAlertText("Are you sure you want to block this user?")
                                }}
                              >
                                <Ban size={16} />
                                <span>
                                  {item.isBlocked ? "Un Block" : "Block"}
                                </span>
                              </button>
                            </li>
                            <li>
                              <button
                                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                onClick={() => deleteAUser(item._id)}
                              >
                                <Trash2 size={16} />
                                <span>Delete Venue</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>

      {/* Pagination */}
      {users && users.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex-1 text-sm text-gray-500">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalUsers}</span> venues
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage <= 1}
              className={`p-2 rounded-md ${
                currentPage <= 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="sr-only">First page</span>
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`p-2 rounded-md ${
                currentPage <= 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="sr-only">Previous page</span>
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`p-2 rounded-md ${
                currentPage >= totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="sr-only">Next page</span>
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage >= totalPages}
              className={`p-2 rounded-md ${
                currentPage >= totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="sr-only">Last page</span>
            </button>
          </div>
        </div>
      )}
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} text={alertText} block={blockUserById} id={selectedUser}/>
    </div>
  );
};

export default UserList;
