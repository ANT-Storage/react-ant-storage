import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Icon } from "@iconify/react";

export default function CategoryCreateView() {
  const linkPath = ["/dashboard", "/categories", "/categories/create"];

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

  const handleFormSubmit = async () => {
    try {
      // Use the ref to get the selected file
      const selectedFile = fileInputRef.current.files[0];

      var imageFormData = new FormData();
      imageFormData.append("file", selectedFile);

      var requestOptions = {
        method: "POST",
        body: imageFormData,
        redirect: "follow",
      };

      fetch("http://localhost:8080/antstorage/v1/images", requestOptions)
        .then((response) => response.json()) // Parse the response as JSON
        .then((result) => {
          // Assuming the response is an object with an "id" property
          var imageId = result.id;

          // Now you can use imageId in the next fetch
          var categoryFormData = new FormData();
          categoryFormData.append("name", category.name);
          categoryFormData.append("image_id", imageId);

          var requestOptions2 = {
            method: "POST",
            body: categoryFormData,
            redirect: "follow",
          };

          fetch(
            "http://localhost:8080/antstorage/v1/categories",
            requestOptions2
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .then(window.history.back())
            .catch((error) => console.log("error", error));
        })
        .catch((error) => console.log("error", error));
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
