const SearchAndFilter = ({ searchQuery, setSearchQuery, onSearch, onFilter }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); // Trigger search with every key press
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchQuery}
        onChange={handleInputChange}
        className="flex-1 px-4 py-2 border rounded-md"
      />
      <button onClick={() => onSearch(searchQuery)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Search
      </button>
      <button onClick={onFilter} className="bg-gray-300 text-black px-4 py-2 rounded-full">
        Filter
      </button>
    </div>
  );
};

export default SearchAndFilter;
