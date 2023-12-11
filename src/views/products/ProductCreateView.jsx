import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Icon } from "@iconify/react";
import ProductImage from "../../assets/images/defaultProductImage.png";
import { useAuth } from '../../auth/AuthContext.jsx'; 

export default function ProductCreateView() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useAuth();
  const linkPath = [
    "/dashboard",
    "/categories",
    `/categories/${categoryId}/products`,
  ];
  const [tagNameField, setTagNameField] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsContent, setTagsContent] = useState('');

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
    "action":`CREATE - Product: ${product.name}`,
    "date": getCurrentDate()
  }

  const handleTagNameFieldChange = (event) => {
    setTagNameField(event.target.value);
    console.log(tags)
  };

  const addTag = () => {
    const newTag =`<span class="font-bold border-2 border-black text-sm px-2 py-1 rounded-full mx-1">${tagNameField}</span>`;
    if(!tagNameField == "") {
      setTags((prevItems) => [...prevItems, tagNameField]);
      setTagsContent(prevContent => prevContent + newTag);
      setTagNameField("");
      
    }
  }

  const descPlaceholder =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const fetchCategory = async (categoryId) => {
    const response = await fetch(
      `http://localhost:8080/antstorage/v1/categories/${categoryId}`
    );
    return response.json();
  };

  const handleImageChange = (fileType,file) => {
    handleInputChange(fileType,file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  async function createTag(tagName,productId) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/antstorage/v1/tags?name=${tagName}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        createProductTag(result.id, productId);

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  async function createProductTag(tagId,productId) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:8080/antstorage/v1/tags_products?tags_id=${tagId}&product_id=${productId}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async function generateTags(productId) {
    tags.map((tag) => {
      createTag(tag,productId);
    })
  }

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
      const imageFormData = new FormData();
      imageFormData.append("file", selectedFile);
  
      const imageResponse = await fetch("http://localhost:8080/antstorage/v1/images", {
        method: "POST",
        body: imageFormData,
        redirect: "follow",
      });
  
      const imageResult = await imageResponse.json();
      const imageId = imageResult.id;
  
      const productFormData = new FormData();
      productFormData.append("barcode", product.barcode);
      productFormData.append("name", product.name);
      productFormData.append("description", product.description);
      productFormData.append("size", product.size);
      productFormData.append("location", product.location);
      productFormData.append("category_id", product.category_id);
      productFormData.append("date", product.date);
      productFormData.append("image_id", imageId);
  
      const productResponse = await fetch("http://localhost:8080/antstorage/v1/products", {
        method: "POST",
        body: productFormData,
        redirect: "follow",
      })
  
      const productResult = await productResponse.json();
      generateTags(productResult.id);
  
      const logFormData = new FormData();
      logFormData.append("author", log.author);
      logFormData.append("action", log.action);
      logFormData.append("date", log.date);
  
      const logResponse = await fetch("http://localhost:8080/antstorage/v1/audit_logs", {
        method: "POST",
        body: logFormData,
        redirect: "follow",
      });
  
      const logResult = await logResponse.json();

      window.location.assign(`/categories/${categoryId}/products`);
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
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Photo"
              disabled={true}
              className="w-auto h-[25em] mx-auto mt-4 p-10"
            />) : (<></>)}
            <input
              className="float-left"
              type="file"
              name="file"
              id=""
              ref={fileInputRef}
              onChange={(e) => handleImageChange("file", e.target.files[0])}
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
            <h3 className="mt-4 font-bold flex align-baseline">
              <Icon icon="mdi:tags" className="relative top-1 mr-2" />
              TAGS
            </h3>
            <p className="text-gray-400 text-sm mb-2">Search for existing tags o create new ones</p>
            <div className="tags">
              <input
                type="text"
                className="border border-gray-400 outline-none rounded px-1"
                placeholder="Tag name"
                value={tagNameField}
                onChange={handleTagNameFieldChange}
              />
              <button onClick={addTag} className="mx-2 bg-gray-400 px-2 py-[0.18em] rounded text-white text-sm">
                Add
              </button>
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: tagsContent }}>
                
              </div>
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
    
  };
