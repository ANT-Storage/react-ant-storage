import React, { useState, useEffect } from "react";
import Header from '../../components/Header';
import { Icon } from "@iconify/react";

export default function CategoryCreateView() {
    const linkPath = [
        "/dashboard",
        "/categories",
        "/categories/create"
    ];

    const fileInputRef = React.createRef();
    const [category, setCategory] = useState({
        name: ""
      });
    
    function goToPreviousPage() {
        window.history.go(-1);
    };

    const handleInputChange = (fieldName, value) => {
        if (fieldName === 'file') {
          setCategory((prevCategory) => ({
            ...prevCategory,
            file: value,
          }));
        } else {
            setCategory((prevCategory) => ({
            ...prevCategory,
            [fieldName]: value,
          }));
        }
      };

    const handleFormSubmit = async () => {
        try {
          // Use the ref to get the selected file
          const selectedFile = fileInputRef.current.files[0];
      
          var formdata = new FormData();
          formdata.append("name", category.name);
          formdata.append("file", selectedFile);
      
          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };
      
          fetch("http://localhost:8080/antstorage/v1/categories", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error))
            //.then(window.open(`/categories/`))
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };

    return (
        <>
            <Header 
                viewName={"New Category"} 
                productCountChip={false} 
                visualPath={"Dashboard / Categories / New category"}
                linkPath={linkPath}  
            />
            <main className="relative">
                <section className="grid grid-cols-4 gap-4 mx-4 mt-2">
                    <div className="form w-3/4 p-4">
                        <label htmlFor="" className="font-semibold">Name</label>
                        <input
                            className="text-[#E39945] block font-bold text-lg outline-none"
                            type="text"
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Name"
                            id="name"
                        />
                        <label htmlFor="" className="font-semibold">Image</label>
                        <input
                            type="file"
                            name="file"
                            id=""
                            ref={fileInputRef}
                            onChange={(e) => handleInputChange("file", e.target.files[0])}
                        />
                        
                        <Icon
                            onClick={goToPreviousPage}
                            icon="lets-icons:back"
                            className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#F8E7CD] text-black cursor-pointer"
                        />
                        <button
                            className="inline my-4 mr-2 h-[2em] py-1 px-2 rounded bg-[#F0CD97] text-black hover:bg-black hover:text-white cursor-pointer"
                            onClick={handleFormSubmit}
                        >
                            Create
                        </button>
                    </div>
                </section>
            </main>
        </>
    )
}
