const ListSkelton = () => {
  return (
    <div>
      <table className="w-full">
        <tbody className="w-full">
          <tr className="font-medium bg-gray-300">
            <td className="text-black p-4 flex items-center animate-pulse">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded ml-1"></div>
            </td>
            <td className="p-4 animate-pulse">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-4 animate-pulse">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-4 animate-pulse">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-4 animate-pulse">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="p-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListSkelton;
