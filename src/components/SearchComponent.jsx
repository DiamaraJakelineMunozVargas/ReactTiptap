import React from "react";
import { Search } from "lucide-react";

const SearchComponent = ({search,setSearch} ) => {
  return (
    <div>
      <label className="input  input-lg m-5 w-full flex p-4 justify-self-center">
      
        <Search size={18} stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"  className="opacity-50"/>
        <input  type="search"  placeholder="Search" value={search} 
        onChange={(e) => setSearch(e.target.value)}/>
      </label>
    </div>
  );
};

export default SearchComponent;
