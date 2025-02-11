import React from "react";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        placeholder="Search patients..."
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
    </div>
  );
};

export default SearchBar;
