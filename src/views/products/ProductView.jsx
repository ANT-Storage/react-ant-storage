import { React, useState, useEffect, useRef } from 'react';
import Header from "../../components/Header";
import ProductImage from "../../assets/images/product-example-img.jpg";
import { Icon } from "@iconify/react";
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.jsx'; 

export default function ProductView() {
    
    const { productId, categoryId } = useParams();
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const { user } = useAuth();
    const [productImage, setProductImage] = useState('');
    const linkPath = [
        "/dashboard",
        "/categories",
        `/categories/${categoryId}/products`,
        `/categories/${categoryId}/products/${productId}`
    ];

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


    const delteModalRef = useRef(null);

      const toggleModal = () => {
        const divStyle = delteModalRef.current.style;
        divStyle.display = divStyle.display === 'none' ? 'block' : 'none';
      };

      const handleDelete = async () => {
        try {
      
          var requestOptions = {
            method: "DELETE",
            redirect: "follow",
          };
      
          fetch(`http://localhost:8080/antstorage/v1/products/${productId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error))
            .then(() => {fetchLog();})
            .then(window.open(`/categories/${categoryId}/products`))
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };

      const log = {
        "author":user.username,
        "action":`DELETE - Product: ${product.name}`,
        "date": getCurrentDate()
    }

    async function fetchLog() {
        const logFormData = new FormData();
        logFormData.append("author", log.author);
        logFormData.append("action", log.action);
        logFormData.append("date", log.date);
    
        const logResponse = await fetch("http://localhost:8080/antstorage/v1/audit_logs", {
        method: "POST",
        body: logFormData,
        redirect: "follow",
        });
    
        const logResult = await logResponse.text()
        .then(console.log(logResult));
    }

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

    return (
        <>
            <div 
                ref={delteModalRef}
                style={{display: "none"}}
                className="absolute w-full h-full z-[1000] bg-[#000000de] text-[#DA7526] font-bold py-[15em] px-4 text-center"
            >
                Are you sure you want to delete this product?
                <div className="mt-4">
                    <button onClick={handleDelete} className="bg-[#DA7526] text-white py-1 px-3 rounded mx-4">
                        Yes
                    </button>
                    <button onClick={toggleModal}>
                        No
                    </button>
                </div>
                
            </div>
            <Header
                viewName={"Product"}
                productName={product.name}
                productCountChip={false}
                search={false}
                visualPath={`Dashboard / Categories / ${category.name} / ${product.name}`}
                linkPath={linkPath}
            />
            <main className="relative">
                <div className="grid grid-cols-3 p-4">
                    <div className="image text-right col-span-1">
                        <img
                            src={`http://localhost:8080/antstorage/v1/images/media/${product.image_id}`}
                            alt="Photo"
                            className="w-auto h-[25em] mx-auto mt-4 p-10"
                        />
                    </div>
                    <div className="col-span-2 pr-10">
                        <div className="action text-right pr-4">
                            <Link to={`${window.location.href}/edit`}>
                                <Icon
                                    icon="material-symbols:edit"
                                    className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#F0CD97] text-black"
                                />
                            </Link>
                            <Icon
                                data-modal-target="default-modal" data-modal-toggle="default-modal"
                                icon="material-symbols:delete"
                                onClick={toggleModal}
                                className="cursor-pointer inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#DA7526] text-white"
                            />
                        </div>

                        <p className="text-[#CECECE]">{product.barcode}</p>
                        <h2 className="text-[#E39945] font-bold text-3xl">
                            {product.name}
                        </h2>
                        <p className="text-[#998E8E] text-md w-3/4 break-words">
                            {product.description}
                        </p>

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
                        <p className="text-[#998E8E]">
                            {product.size}
                        </p>

                        <h3 className="mt-4 mb-0 font-bold flex align-baseline">
                            <Icon
                                icon="mdi:location"
                                className="relative top-1 mr-2"
                            />
                            FROM
                        </h3>
                        <p className="text-[#998E8E]">
                            {product.location}
                        </p>

                        <h3 className="mt-4 mb-0 font-bold flex align-baseline">
                            <Icon
                                icon="mdi:calendar"
                                className="relative top-1 mr-2"
                            />
                            DATE
                        </h3>
                        <p className="text-[#998E8E]">
                            {product.date}
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
