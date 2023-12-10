import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Icon } from "@iconify/react";
import { useAuth } from '../../auth/AuthContext.jsx'; 

export default function CategoryCreateView() {
  const linkPath = ["/dashboard", "/categories", "/categories/create"];
  const { user } = useAuth();
  const fileInputRef = React.createRef();

  const [imageId, setImageId] = useState("");
  const [category, setCategory] = useState({
    name: "",
    image_id: "",
  });

  function goToPreviousPage() {
    window.history.go(-1);
  }

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "file") {
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

  const getCurrentDate = () => {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var dateTime = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
    return dateTime;
  }

  const log = {
    "author":user.username,
    "action":`CREATE - Category: ${category.name}`,
    "date": getCurrentDate()
  }

  const handleFormSubmit = async () => {
    try {
      const selectedFile = fileInputRef.current.files[0];
  
      var imageFormData = new FormData();
      imageFormData.append("file", selectedFile);
  
      var requestOptions = {
        method: "POST",
        body: imageFormData,
        redirect: "follow",
      };
  
      const imageResponse = await fetch("http://localhost:8080/antstorage/v1/images", requestOptions);
      const imageResult = await imageResponse.json();
      var imageId = imageResult.id;
  
      var categoryFormData = new FormData();
      categoryFormData.append("name", category.name);
      categoryFormData.append("image_id", imageId);
  
      var requestOptions2 = {
        method: "POST",
        body: categoryFormData,
        redirect: "follow",
      };
  
      const categoryResponse = await fetch("http://localhost:8080/antstorage/v1/categories", requestOptions2);
      const categoryResult = await categoryResponse.text();
  
      const logFormData = new FormData();
      logFormData.append("author", log.author);
      logFormData.append("action", log.action);
      logFormData.append("date", log.date);
  
      const logResponse = await fetch("http://localhost:8080/antstorage/v1/audit_logs", {
        method: "POST",
        body: logFormData,
        redirect: "follow",
      });
  
      const logResult = await logResponse.text();
  
      // Open a new window after all requests have been completed successfully
      window.location.assign(`/categories/`);
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
            <label htmlFor="" className="font-semibold">
              Name
            </label>
            <input
              className="text-[#E39945] block font-bold text-lg outline-none"
              type="text"
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Name"
              id="name"
            />
            <label htmlFor="" className="font-semibold">
              Image
            </label>
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
  );
}
