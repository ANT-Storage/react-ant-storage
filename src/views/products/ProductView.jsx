import { React, useState, useEffect } from 'react';
import Header from "../../components/Header";
import ProductImage from "../../assets/images/product-example-img.jpg";
import { Icon } from "@iconify/react";
import { useParams, Link } from 'react-router-dom';

export default function ProductView() {
    
    const { productId, categoryId } = useParams();
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');

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
          .catch(error => console.log('error', error));
    
    
      }, []);

    return (
        <>
            <Header
                viewName={"Product"}
                productName={product.name}
                productCountChip={false}
                search={false}
                path={`Dashboard / Categories / ${category.name} / ${product.name}`}
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
                            <Link to={`${window.location.href}/edit`}>
                                <Icon
                                    icon="material-symbols:edit"
                                    className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#F0CD97] text-black"
                                />
                            </Link>
                            <Icon
                                data-modal-target="default-modal" data-modal-toggle="default-modal"
                                icon="material-symbols:delete"
                                className="inline mr-2 w-[2em] h-[2em] p-2 rounded bg-[#DA7526] text-white"
                            />
                        </div>

                        <p className="text-[#CECECE]">{product.barcode}</p>
                        <h2 className="text-[#E39945] font-bold text-3xl">
                            {product.name}
                        </h2>
                        <p className="text-[#998E8E] text-md w-3/4">
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
                        <p className="text-[#998E8E]">30 x 30 cm</p>

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
