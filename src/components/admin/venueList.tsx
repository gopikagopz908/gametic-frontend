"use client";
import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ArrowUpDown,
  Ban,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ListSkeleton from "./skelton/tableSkelton";

interface VenuesListProps {
  search: string;
}

const VenueList: React.FC<VenuesListProps> = ({ search }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, venues, totalVenues } = useAppSelector(
    (state) => state.adminVenues
  );

  useEffect(() => {
    dispatch(fetchAllVenues({ page: currentPage, limit: 5, search }));
  }, [dispatch, currentPage, search]);

  const itemsPerPage = 5;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalVenues || 0);
  const totalPages = Math.ceil((totalVenues || 0) / itemsPerPage);

  return (
    <div className="w-full rounded-lg bg-white shadow-sm border border-gray-100">
      {/* Table header with actions */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Venues</h2>
      </div>

      {/* Empty state - Only show when not loading and no venues */}
      {!loading && venues?.length === 0 && (
        <div className="w-full p-12 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="mt-4 text-gray-600 font-medium">No venues found</p>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      )}

      {/* Table content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-medium">
                <div className="flex items-center cursor-pointer hover:text-gray-700">
                  Venue Name
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="p-4 font-medium">
                <div className="flex items-center cursor-pointer hover:text-gray-700">
                  Owner
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="p-4 font-medium">
                <div className="flex items-center cursor-pointer hover:text-gray-700">
                  Type
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="p-4 font-medium">
                <div className="flex items-center cursor-pointer hover:text-gray-700">
                  Size
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="p-4 font-medium">
                <div className="flex items-center cursor-pointer hover:text-gray-700">
                  Status
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          {loading ? (
            <ListSkeleton />
          ) : (
            venues &&
            venues.length > 0 && (
              <tbody className="divide-y divide-gray-100">
                {venues.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                          {item?.images?.[0] ? (
                            <Image
                              src={item.images[0]}
                              fill
                              alt={item.name}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                              <span className="text-xs">No Img</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-800">
                            {item?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item?.location},{item.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{"Aginaspk"}</td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item?.turfType}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{item?.size}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                        Active
                      </span>
                      {/* Conditional rendering for status */}
                      {/* {item.isBlocked ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5"></span>
                        Banned
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                        Active
                      </span>
                    )} */}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          title="View details"
                        >
                          <Eye
                            size={18}
                            className="text-gray-500 hover:text-blue-600"
                          />
                        </button>
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
                            className="dropdown-content menu shadow-lg bg-white rounded-lg p-2 w-48 border border-gray-100"
                          >
                            <li>
                              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                                <Ban size={16} />
                                <span>Ban Venue</span>
                              </button>
                            </li>
                            <li>
                              <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
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
            )
          )}
        </table>
      </div>

      {/* Pagination - Only show when we have venues */}
      {venues && venues.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex-1 text-sm text-gray-500">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalVenues}</span> venues
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
    </div>
  );
};

export default VenueList;
