import React from 'react';

const Table = ({ items, hiddenColumns }) => {
  const columns = items.length > 0 ? Object.keys(items[0]) : [];

  const visibleColumns = columns.filter((column) => !hiddenColumns.includes(column));

  return (
    <table className="relative overflow-x-auto w-full text-sm text-left rtl:text-right">
      <thead className="text-xs font-semibold bg-[#E39945] text-white">
        <tr>
          {visibleColumns.map((column) => (
            <th scope="col" className="px-6 py-2" key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr className={`text-[#929292] border-b ${index % 2 === 0 ? 'bg-[#F9F9F9]' : ''}`} key={index}>
            {visibleColumns.map((column) => (
                
              <td className={`px-6 py-2`} key={column}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
