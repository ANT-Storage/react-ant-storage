import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Table = ({ items, hiddenColumns, linkField }) => {
  const columns = items.length > 0 ? Object.keys(items[0]) : [];
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const visibleColumns = columns.filter((column) => !hiddenColumns.includes(column));

  function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }

  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[linkField];
    const bValue = b[linkField];

    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
    } else {
      return bValue.localeCompare(aValue, undefined, { sensitivity: 'base' });
    }
  });

  const getCurrentLinkFieldPath = (id) => {
    const currentURL = window.location.href;
    const currentPageURL = `${currentURL}/${id}`;
    return currentPageURL;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(sortedItems.length / itemsPerPage)));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <table className="relative overflow-x-auto w-full text-sm text-left rtl:text-right">
        <thead className="text-md bg-[#E39945] text-white">
          <tr className="font-bold">
            {visibleColumns.map((column) => (
              <th scope="col" className="px-6 py-2" key={column}>
                {column === linkField ? (
                  <>
                    {capitalizeFirstLetter(column)}{' '}
                    <button type="button" onClick={handleSortToggle}>
                      {sortOrder === 'asc' ? (
                        <Icon className="mx-1 relative top-0.5" icon="octicon:sort-asc-16" width="16" height="16" />
                      ) : (
                        <Icon className="mx-1 relative top-0.5" icon="octicon:sort-desc-16" width="16" height="16" />
                      )}
                    </button>
                  </>
                ) : (
                  capitalizeFirstLetter(column)
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr className={`text-[#929292] border-b ${index % 2 === 0 ? 'bg-[#F9F9F9]' : ''}`} key={index}>
              {visibleColumns.map((column) => (
                <td className={`px-6 py-2`} key={column}>
                  {column === linkField ? (
                    <Link to={getCurrentLinkFieldPath(item.id)} className="font-bold hover:underline">
                      {item[column]}
                    </Link>
                  ) : (
                    item[column]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination rounded float-right text-center m-2 p-2">
        <button className={currentPage === 1 ? 'mx-1 text-white' : 'mx-1 text-[#E39945]'} onClick={goToPrevPage} disabled={currentPage === 1}>
          <Icon className="relative top-0.5" icon="mingcute:left-fill" width="16" height="16" />
        </button>
        {Array.from({ length: Math.ceil(sortedItems.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => paginate(pageNumber)} className={pageNumber === currentPage ? 'bg-[#E39945] text-white mx-1 py-1 px-2 rounded' : 'mx-1 py-1 px-2'}>
            {pageNumber}
          </button>
        ))}
        <button className={currentPage === Math.ceil(sortedItems.length / itemsPerPage) ? 'mx-1 text-white' : 'mx-1 text-[#E39945]'} onClick={goToNextPage} disabled={currentPage === Math.ceil(sortedItems.length / itemsPerPage)}>
          <Icon className="relative top-0.5" icon="mingcute:right-fill" width="16" height="16" />
        </button>
      </div>

    </div>
  );
};

export default Table;
