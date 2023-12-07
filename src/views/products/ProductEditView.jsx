import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import ProductImage from "../../assets/images/product-example-img.jpg";
import { Icon } from "@iconify/react";
import { useParams, Link } from 'react-router-dom';

export default function ProductEditView() {
  const { productId, categoryId } = useParams();
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');

  const linkPath = [
    "/dashboard",
    "/categories",
    `/categories/${categoryId}/products`,
    `/categories/${categoryId}/products/${productId}`
  ];

  const fileInputRef = React.createRef();

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/antstorage/v1/categories/${categoryId}`, requestOptions)
        .then(response => response.json())  // Assuming the response is JSON
        .then(result => setCategory(result))
        .catch(error => console.log('error', error));
    
    fetch(`http://localhost:8080/antstorage/v1/products/${productId}`, requestOptions)
      .then(response => response.json())  // Assuming the response is JSON
      .then(result => setProduct(result))
      .catch(error => console.log('error', error))


  }, []);


  function goToPreviousPage() {
    window.history.go(-1);
  }

  const handleInputChange = (fieldName, value) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      [fieldName]: value,
    }));
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
      
      if (selectedFile) {

        var imageFormData = new FormData();
        imageFormData.append("file", selectedFile);

        var formdata = new FormData();
          formdata.append("barcode", product.barcode);
          formdata.append("name", product.name);
          formdata.append("description", product.description);
          formdata.append("size", product.size);
          formdata.append("location", product.location);
          formdata.append("category_id", product.category_id);
          formdata.append("date", product.date);
          formdata.append("image_id", imageId);
      
          var requestOptions = {
            method: "PUT",
            body: formdata,
            redirect: "follow",
          };
      
          fetch(`http://localhost:8080/antstorage/v1/products/${productId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error))
            .then(window.open(`/categories/${categoryId}/products`))
            .catch((error) => console.log("error", error));
      } else {
          var formdata = new FormData();
          formdata.append("barcode", product.barcode);
          formdata.append("name", product.name);
          formdata.append("description", product.description);
          formdata.append("size", product.size);
          formdata.append("location", product.location);
          formdata.append("category_id", product.category_id);
          formdata.append("date", product.date);
          formdata.append("image_id", product.image_id);
      
          var requestOptions = {
            method: "PUT",
            body: formdata,
            redirect: "follow",
          };
      
          fetch(`http://localhost:8080/antstorage/v1/products/${productId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error))
            .then(window.open(`/categories/${categoryId}/products`))
      }} catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Header
        viewName={product.name}
        productCountChip={false}
        search={false}
        visualPath={`Dashboard / Categories / ${category.name} / ${product.name}`}
        linkPath={linkPath}
      />
      <main className="relative">
        <div className="grid grid-cols-3 p-4">
          <div className="image text-left col-span-1">
            <img
                src={`http://localhost:8080/antstorage/v1/images/media/${product.image_id}`}
                alt="Photo"
                className="w-auto h-[20em] mx-auto mt-4 p-10"
            />
            <input
              type="file"
              name="file"
              id=""
              ref={fileInputRef}
              onChange={(e) => handleInputChange("file", e.target.files[0])}
            />
            <input
              type="text"
              className="hidden"
              value={product.image_id}
              onChange={(e) => handleInputChange('image_id', e.target.value)}
            />
          </div>
          <div className="col-span-2 pr-10">
            
            <div className="action text-right pr-4">
              <Icon
                onClick={goToPreviousPage}
                icon="lets-icons:back"
                className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#F8E7CD] text-black cursor-pointer"
              />
              <Icon
                icon="material-symbols:save-sharp"
                onClick={handleFormSubmit}
                className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#F0CD97] text-black hover:bg-black hover:text-white cursor-pointer"
              />
            </div>

            <div className="relative -top-8 w-3/4 py-1 px-3 rounded border border-[#DA7526] text-[#DA7526] bg-[#F8E7CD]">
              <p className="inline-flex items-baseline font-bold">
                <Icon icon="material-symbols:edit" className="mr-1 relative top-0.5" />
                You are modifying the product
              </p>
            </div>

            <input
              className="text-[#CECECE] block w-3/4 outline-none"
              value={product.barcode}
              spellCheck={"false"}
              onChange={(e) => handleInputChange('barcode', e.target.value)}
            />
            <input
              className="text-[#E39945] block font-bold text-3xl w-3/4 outline-none"
              type="text"
              name=""
              spellCheck={"false"}
              id="name"
              value={product.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <textarea
              className="text-[#998E8E] text-md w-3/4 block outline-none"
              value={product.description}
              spellCheck={"false"}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />

              <h3 className="mt-4 mb-2 font-bold flex align-baseline">
                <Icon
                    icon="mdi:tags"
                    className="relative top-1 mr-2"
                />
                TAGS
              </h3>
              <div className="tags">
                  <span className="text-[#6D6D6D] border-2 border-[#F0CD97] py-1 px-3 rounded-full mr-2 text-sm">
                      Sport
                  </span>
                  <span className="text-[#6D6D6D] border-2 border-[#F0CD97] py-1 px-3 rounded-full mr-2 text-sm">
                      Sport
                  </span>
                  <span className="text-[#6D6D6D] border-2 border-[#F0CD97] py-1 px-3 rounded-full mr-2 text-sm">
                      Sport
                  </span>
              </div>

              <h3 className="mt-4 mb-0 font-bold flex align-baseline">
                  <Icon
                      icon="radix-icons:size"
                      className="relative top-1 mr-2"
                  />
                  SIZE
              </h3>
              <input
                className="text-[#998E8E] outline-none"
                type="text"
                name=""
                placeholder="Size"
                id="name"
                value={product.size}
                onChange={(e) => handleInputChange("size", e.target.value)}
              />
              
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
              value={product.location}
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
              value={product.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>
        </div>
      </main>
    </>
  );
}
