import { Search } from 'lucide-react';

export default function SearchBar ({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="search-icon">
          <Search size={20} />
        </div>
      </div>
    </div>
  );
};