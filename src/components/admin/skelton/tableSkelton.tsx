const ListSkeleton = () => {
  return (
    <tbody className="animate-pulse">
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="border-b border-gray-100">
          <td className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </td>
          <td className="p-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
          <td className="p-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
          <td className="p-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
          <td className="p-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
          <td className="p-4"><div className="h-6 bg-gray-200 rounded w-20"></div></td>
        </tr>
      ))}
    </tbody>
  );
};

export default ListSkeleton