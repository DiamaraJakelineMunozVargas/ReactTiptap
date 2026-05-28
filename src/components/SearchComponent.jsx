import React from "react";
import { Search } from "lucide-react";

const SearchComponent = ({search,setSearch} ) => {
  return (
    <div className="w-full p-3 justify-start m-1">
      <label className="input">
      
        <Search size={18} stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"  className="opacity-50"/>
        <input className="input input-ghost input-lg" type="search"  placeholder="Search" value={search} 
        onChange={(e) => setSearch(e.target.value)}/>
      </label>
    </div>
  );
};

export default SearchComponent;
