import React from 'react'
import categoryImage from "../../assets/images/category-example-img.jpg"
import { Link } from 'react-router-dom';

export default function CategoryCard({id, name, image_id}) {
  return (
    <>  
        <Link to={`/categories/${id}/products`}>
          <div className="card shadow-md rounded-md mt-4 cursor-pointer hover:shadow-xl">
              <img 
                src={`http://localhost:8080/antstorage/v1/images/media/${image_id}`}
                alt="" 
                className="rounded-t-md max-h-[9em] w-full mx-auto" 
              />
              <div className="card-body p-3">
                  <h1 className="flex align-baseline font-semibold">
                      {name} 
                  </h1>
              </div>
          </div>
        </Link>
    </>
  )
}
