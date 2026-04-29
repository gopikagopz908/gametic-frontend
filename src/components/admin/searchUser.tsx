"use client";
import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
interface SearchUserProps {
  onSearch: (search: string) => void;
  getRole: (role: string) => void;
}

const SearchUser: React.FC<SearchUserProps> = ({ onSearch, getRole }) => {
  const [filterRole, setFilterRole] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
  };
  return (
    <div className="w-full flex p-5 justify-between">
      <div className="relative">
        <div
          className={`w-[200px] h-[56px] border border-black/20 rounded-xl hover:border-black/50 p-4 pr-9 relative ${
            filterRole === "" ? "text-black/50" : "text-black"
          }`}
        >
          {filterRole === "" ? "Role" : filterRole}
          {filterRole ? (
            <X
              size={18}
              className="text-black/50 absolute right-3 top-5"
              onClick={() => {
                setFilterRole("");
                getRole("");
              }}
            />
          ) : (
            <ChevronDown
              size={20}
              className={`text-black/50 absolute right-3 top-5 ${isRoleOpen && "rotate-180"}`}
              onClick={() => setIsRoleOpen(!isRoleOpen)}
            />
          )}
        </div>
        <div
          className={`absolute list-none w-[200px] bg-white top-12 rounded-b-xl ${
            !isRoleOpen ? "h-0" : "h-[80px] border border-black/20"
          } overflow-hidden`}
        >
          <li
            className="w-full py-2 px-4 text-black/80 hover:bg-[#f4f5f6] cursor-pointer"
            onClick={() => {
              setFilterRole("Users");
              getRole("user");
              setIsRoleOpen(false);
            }}
          >
            Users
          </li>
          <li
            className="w-full py-2 px-4 text-black/80 hover:bg-[#f4f5f6] cursor-pointer"
            onClick={() => {
              setFilterRole("Owners");
              getRole("owner");
              setIsRoleOpen(false);
            }}
          >
            Owners
          </li>
        </div>
      </div>
      <div
        className={`group w-[850px] h-[56px] border rounded-xl relative ${
          isHovered ? "border-black/50" : "border-black/20"
        }`}
      >
        <Search
          size={20}
          className="absolute text-black/50 top-[17px] left-2"
        />
        <input
          className="w-full h-full py-3.5 px-10 rounded-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          placeholder="Search.."
          type="text"
          name="search"
          id="search"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchUser;
