import React from 'react'
import categoryImage from "../../assets/images/category-example-img.jpg"

export default function CategoryCard({name, image}) {
  return (
    <>  
        <div className="card shadow-md rounded-md mt-4 cursor-pointer hover:shadow-xl">
            <img src={categoryImage} alt="" className="rounded-t-md" />
            <div className="card-body p-3">
                <h1 className="flex align-baseline font-semibold">
                    {name} 
                </h1>
            </div>
        </div>
    </>
  )
}
