import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Icon } from "@iconify/react";
import ProductImage from "../../assets/images/defaultProductImage.png";

export default function ProductCreateView() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState("");
  const linkPath = [
    "/dashboard",
    "/categories",
    `/categories/${categoryId}/products`,
  ];

  const fileInputRef = React.createRef();

  const [product, setProduct] = useState({
    barcode: "",
    name: "",
    description: "",
    location: "",
    date: "",
    category_id: categoryId,
    url_img: ""
  });

  const descPlaceholder =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const fetchCategory = async (categoryId) => {
    const response = await fetch(
      `http://localhost:8080/antstorage/v1/categories/${categoryId}`
    );
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResult] = await Promise.all([fetchCategory(categoryId)]);

        setCategory(categoryResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [categoryId]);

  function goToPreviousPage() {
    window.history.go(-1);
  }

  const handleInputChange = (fieldName, value) => {
    if (fieldName === 'file') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        file: value,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [fieldName]: value,
      }));
    }
  };

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
      
      fetch("http://localhost:8080/antstorage/v1/images", requestOptions)
        .then((response) => response.json()) // Parse the response as JSON
        .then((result) => {
          // Assuming the response is an object with an "id" property
          var imageId = result.id;
          var formdata = new FormData();
          formdata.append("barcode", product.barcode);
          formdata.append("name", product.name);
          formdata.append("description", product.description);
          formdata.append("location", product.location);
          formdata.append("category_id", product.category_id);
          formdata.append("date", product.date);
          formdata.append("image_id", imageId);
      
          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };
      
          fetch("http://localhost:8080/antstorage/v1/products", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error))
            .then(window.open(`/categories/${categoryId}/products`))
              
            })
            .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div>
      <Header
        viewName={"New product"}
        search={false}
        visualPath={`Dashboard / Categories / ${category.name} / New product`}
        linkPath={linkPath}
      />
      <main className="relative">
        <div className="grid grid-cols-3 p-4">
          <div className="image text-right col-span-1">
            <img
              src={ProductImage}
              alt="Photo"
              disabled={true}
              className="w-auto h-[25em] mx-auto mt-4 p-10"
            />
            <input
              type="file"
              name="file"
              id=""
              ref={fileInputRef}
              onChange={(e) => handleInputChange("file", e.target.files[0])}
            />
          </div>
          <div className="col-span-2 pr-10">
            <div className="action text-right pr-4">
              <Icon
                onClick={goToPreviousPage}
                icon="lets-icons:back"
                className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#F8E7CD] text-black cursor-pointer"
              />
              <button
                onClick={handleFormSubmit}
                className="inline mr-2 h-[2em] py-1 px-2 rounded bg-[#F0CD97] text-black hover:bg-black hover:text-white cursor-pointer"
              >
                Create
              </button>
            </div>

            <input
              className="text-[#CECECE] block outline-none"
              placeholder="Barcode"
              onChange={(e) => handleInputChange("barcode", e.target.value)}
            />
            <input
              className="text-[#E39945] block font-bold text-3xl outline-none"
              type="text"
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Name"
              id="name"
            />
            <textarea
              className="text-[#998E8E] text-md w-3/4 block outline-none"
              placeholder={descPlaceholder}
              autoCorrect={"off"}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            <h3 className="mt-4 mb-2 font-bold flex align-baseline">
              <Icon icon="mdi:tags" className="relative top-1 mr-2" />
              TAGS
            </h3>
            <div className="tags">
              <span className="text-[#998E8E] border-2 border-[#998E8E] py-1 px-3 rounded-full mr-2 text-sm">
                Tags
              </span>
            </div>
            <h3 className="mt-4 mb-0 font-bold flex align-baseline">
              <Icon icon="mdi:location" className="relative top-1 mr-2" />
              FROM
            </h3>
            <input
              className="text-[#998E8E] outline-none"
              type="text"
              name=""
              placeholder="Location"
              id="name"
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
            <h3 className="mt-4 mb-0 font-bold flex align-baseline">
              <Icon icon="mdi:calendar" className="relative top-1 mr-2" />
              DATE
            </h3>
            <input
              className="text-[#998E8E] outline-none"
              type="date"
              name=""
              id=""
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
