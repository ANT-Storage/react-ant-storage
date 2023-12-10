import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header.jsx';

function ConfigurationView() {
    const [logs, setLogs] = useState([]);
    const hiddenColumns = ['id', 'url_img', 'category_id'];
    const [dangerOption, setDangerOption] = useState(0);

    const linkPath = [
        "/dashboard",
        "/configuration",
    ];

    function capitalizeFirstLetter(inputString) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }

    const delteModalRef = useRef(null);

    useEffect(() => {
        // Set initial style after the component has mounted
        if (delteModalRef.current) {
            delteModalRef.current.style.display = 'none';
        }
    }, []); // Empty dependency array ensures the effect runs only once after mount

    const toggleModal = (option) => {
            setDangerOption(option) ;
            const divStyle = delteModalRef.current.style;
            divStyle.display = divStyle.display === 'none' ? 'block' : 'none';
    };

    const handleDangerButtonPress = () => {
        toggleModal();
        switch (dangerOption) {
            case 1:
                resetUsers();
                break;
            case 2:
                resetCategories();
                break;
            case 3:
                restoreApp();
                break;
            default:
                break;
        }
    };

    async function resetUsers() {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8080/antstorage/v1/users/restart_all", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    async function resetCategories() {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8080/antstorage/v1/categories/reset_all", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    async function restoreApp() {
        var requestOptions = {
            method: "DELETE",
            redirect: "follow",
          };
      
        fetch(`http://localhost:8080/antstorage/v1/configurations/restore_app`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error))
    }

    return (
        <div>
            <div
                ref={delteModalRef}
                className="absolute w-full h-full z-[1000] bg-[#000000de] text-[#DA7526] font-bold py-[15em] px-4 text-center"
            >
                Are you sure you want to do it?
                <div className="mt-4">
                    <button onClick={handleDangerButtonPress} className="bg-[#DA7526] text-white py-1 px-3 rounded mx-4">
                        Yes
                    </button>
                    <button onClick={toggleModal}>
                        No
                    </button>
                </div>
            </div>
            <Header
                viewName={"Configuration"}
                productCountChip={false}
                visualPath={"Dashboard / Configuration"}
                linkPath={linkPath}
            />
            <main className="relative grid grid-cols-2 p-5">
                <section>
                    <h2 className="font-bold text-red-600">Danger Zone</h2>
                    <hr className="my-1" />
                    <p className="text-md">Restart all users <button onClick={() => toggleModal(1)} className="float-right relative top-1 text-sm bg-red-600 py-1 px-3 rounded text-white">Delete all</button></p>
                    <p className="text-sm text-gray-400 mb-2">Delete all users except the administrator.</p>

                    <p className="text-md">Reset categories<button onClick={() => toggleModal(2)} className="float-right relative top-1 text-sm bg-red-600 py-1 px-3 rounded text-white">Delete all</button></p>
                    <p className="text-sm text-gray-400 mb-2">Delete all the categories</p>

                    <hr className="my-1 mb-4" />

                    <p className="text-md text-red-600 font-bold">Restore the app<button onClick={() => toggleModal(3)} className="float-right relative top-1 text-sm bg-red-600 py-1 px-3 rounded text-white">Restore</button></p>
                    <p className="text-sm text-gray-400 mb-2">The app will restore itself deleting all the data</p>
                </section>
                <section>
                    {/* Content for the second section */}
                </section>
            </main>
        </div>
    );
}

export default ConfigurationView;
