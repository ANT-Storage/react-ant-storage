import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const SearchBox = ({ field, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term,field);
  };

  return (
    <div className="relative w-3/4 float-right">
      <input
        type="text"
        placeholder={`Search by ${field}`}
        value={searchTerm}
        onChange={handleInputChange}
        spellCheck={false}
        className="block py-1.5 px-3 w-full z-20 text-sm rounded-xl bg-white outline-none"
      />
      <button onClick={handleInputChange} type="button" className="absolute top-0 end-0 py-1.5 px-3 text-sm font-medium h-full rounded-full">
        <Icon icon="material-symbols:search" className="text-lg text-orange-400 font-bold" />
      </button>
    </div>
  );
};

export default SearchBox;
