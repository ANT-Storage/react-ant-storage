import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function LogsTable() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getLogs = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/antstorage/v1/audit_logs", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => setLogs(Array.isArray(result) ? result : []))
            .catch(error => {
                console.error('Error fetching logs:', error);
                setError('Error fetching logs. Please try again.');
            });
    };

    useEffect(() => {
        getLogs();
    }, []);

    const generateActionText = (action) => {
        var actionTxt = action.split(" -")[0];
        var body = action.split(" -")[1];
        var object = body.split(":")[0];
        var objectDetails = body.split(":")[1];
        var icon = "";
        if(object.includes('Category')) {
            icon = <Icon className="mr-0.5 inline-flex" icon="material-symbols:category" />;
        } else if (object.includes('Product')) {
            icon = <Icon className="mr-0.5 inline-flex" icon="icon-park-outline:ad-product" />;
        } else if (object.includes('User')) {
            icon = <Icon className="mr-0.5 inline-flex" icon="mdi:user" />;
        }

        if (actionTxt.includes('CREATE')) {
            return(
                <>
                    <span className="bg-green-600 text-white px-1 py-1 rounded mr-1 font-bold">{actionTxt}</span>
                    <span className="font-bold mr-2 border border-black rounded px-2 py-1">{icon} {object}</span>{objectDetails}
                </>
            )
        } else if (actionTxt.includes('EDIT')) {
            return(
                <>
                    <span className="bg-blue-600 text-white px-1 py-1 rounded mr-1 font-bold">{actionTxt}</span>
                    <span className="font-bold mr-2 border border-black rounded px-2 py-1">{icon} {object}</span>{objectDetails}
                </>
            )
        } else if (actionTxt.includes('DELETE')) {
            return(
                <>
                    <span className="bg-red-600 text-white px-1 py-1 rounded mr-1 font-bold">{actionTxt}</span>
                    <span className="font-bold mr-2 border border-black rounded px-2 py-1">{icon} {object}</span>{objectDetails}
                </>
            )
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = logs.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredItems.length / itemsPerPage)));
      };
    
      const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      };

    return (
        <>
            <div className="filters grid grid-cols-2 px-5 py-2">
                <section className="left">
                    
                </section>
                <section className="right">
                    
                </section>
            </div>

            {error ? (
                <p>{error}</p>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                        <tr className="grid grid-cols-6 mb-2">
                            <th className="bg-[#E39945] pl-5 text-white text-left p-1">Date</th>
                            <th className="col-span-4 bg-[#E39945] text-white text-left p-1">Action</th>
                            <th className="bg-[#E39945] text-white text-left p-1">Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(log => (
                            <tr className="grid grid-cols-6" key={log.id}>
                                <td className="pl-5 mb-2 text-gray-400">
                                    {log.date}
                                </td>
                                <td className="col-span-4 mb-2">
                                    {generateActionText(log.action)}
                                </td>
                                <td className="mb-2 font-bold">
                                    {log.author}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        <div className="pagination-section">
            <div className="pagination rounded float-right text-center m-2">
                <button className={currentPage === 1 ? 'mx-1 text-white' : 'mx-1 text-[#E39945]'} onClick={goToPrevPage} disabled={currentPage === 1}>
                    <Icon className="relative top-0.5" icon="mingcute:left-fill" width="16" height="16" />
                </button>
                {Array.from({ length: Math.ceil(logs.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                    <button key={pageNumber} onClick={() => paginate(pageNumber)} className={pageNumber === currentPage ? 'bg-[#E39945] text-white mx-1 py-1 px-2 rounded' : 'mx-1 py-1 px-2'}>
                    {pageNumber}
                    </button>
                ))}
                <button className={currentPage === Math.ceil(logs.length / itemsPerPage) ? 'mx-1 text-white' : 'mx-1 text-[#E39945]'} onClick={goToNextPage} disabled={currentPage === Math.ceil(logs.length / itemsPerPage)}>
                    <Icon className="relative top-0.5" icon="mingcute:right-fill" width="16" height="16" />
                </button>
            </div>
        </div>
        </>
    );
}
