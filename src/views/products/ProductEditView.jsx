import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import ProductImage from "../../assets/images/product-example-img.jpg";
import { Icon } from "@iconify/react";
import { useParams, Link } from 'react-router-dom';

export default function ProductEditView() {
  const { productId } = useParams();
  const [product, setProduct] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/antstorage/v1/products/${productId}`)
      .then(response => response.json())
      .then(result => setProduct(result))
      .catch(error => console.log('error', error));
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

  return (
    <>
      <Header
        viewName={"Modify product"}
        productCountChip={false}
        search={false}
        path={`Home / Categories / Sudaderas / ${product.name}`}
      />
      <main className="relative">
        <div className="grid grid-cols-3 p-4">
          <div className="image text-right col-span-1">
            <img
              src={ProductImage}
              alt="Photo"
              className="w-auto h-[25em] mx-auto mt-4"
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
                className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#F0CD97] text-black hover:bg-black hover:text-white cursor-pointer"
              />
            </div>

            <input
              className="text-[#CECECE] block outline-none"
              value={product.barcode}
              onChange={(e) => handleInputChange('barcode', e.target.value)}
            />
            <input
              className="text-[#E39945] block font-bold text-3xl outline-none"
              type="text"
              name=""
              id="name"
              value={product.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <textarea
              className="text-[#998E8E] text-md w-3/4 block outline-none"
              value={product.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />

            
          </div>
        </div>
      </main>
    </>
  );
}
