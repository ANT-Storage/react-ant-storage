import React from 'react'
import warehouseImage from "../assets/images/warehouse_img.jpg"
import SearchBox from './SearchBox'
import { useAuth } from '../auth/AuthContext.jsx'
import { Icon } from '@iconify/react'

export default function Header({ viewName, productName, productCountChip, search, path }) {

  const { user, logout } = useAuth();

  let productCountChipContent = "";
  let searchContent = "";
  let navPath = viewName;
  
  if(productCountChip) {
    productCountChipContent = 
    <span className="bg-[#F0CD97] relative -top-1 text-black text-xs py-2 px-3 mx-2 rounded-full">
      123 products
    </span>;
  }

  if(search) {
    searchContent = <SearchBox />;
  }

  if(productName) {
    viewName = "Product";
  }


  return (
    <>
      <div style={{backgroundImage: `url(${warehouseImage})`}} className="relative header-bg-image z-0"></div>
      <header className="orange-header-gradient z-50">
          <div className="grid grid-cols-2">
            <section className="name-image p-5">
                <h1 className="text-white font-bold text-2xl">
                  {viewName} {} {productCountChipContent}
                </h1>
            </section>
            <section className="right-side text-end p-5 grid grid-cols-5">
              <div className="search col-span-4">
                {searchContent}
              </div>
              <div className="profile px-2 py-1">
                <p className="flex align-baseline">
                  {user ? user.username : 'Username'}
                  <Icon className="cursor-pointer relative top-1 ml-2" onClick={logout} icon="material-symbols:logout" />  
                </p>         
              </div>
              
            </section>
          </div>
          <nav className="bg-[#FDF7ED] px-5 py-1 border-b-gray-400 border nav-breadcumbs font-normal text-sm">
          <p>
            <span>{path}</span> /<span className="active text-orange-400 font-bold ml-1">{productName}</span></p>
        </nav>
      </header>
    </>
  )
}
