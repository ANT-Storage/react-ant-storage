import React from 'react'
import warehouseImage from "../assets/images/warehouse_img.jpg"
import SearchBox from './SearchBox'
import { useAuth } from '../auth/AuthContext.jsx'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export default function Header({ viewName, productName, productCount, search, onSearch, searchField, visualPath, linkPath}) {

  const { user, logout } = useAuth();

  let productCountChipContent = "";
  let searchContent = "";
  let navPath = viewName;
  let newButton = <button></button>;
  
  if(productCount > 0) {
    productCountChipContent = 
    <span className="bg-[#F0CD97] relative -top-0.5 text-black text-xs py-2 px-3 mx-4 rounded-full">
      {productCount} products
    </span>;
  }

  if(search) {
    searchContent = <SearchBox field={searchField} onSearch={onSearch} />;
  }

  if(productName) {
    viewName = "Product";
  }

  function generateBreadcrumbs() {
    const breadcrumbCount = visualPath.split(' / ').length;
  
    return visualPath.split(' / ').map((path, index) => (
      <React.Fragment key={index}>
        <Link to={linkPath[index]} className={`hover:underline${index === breadcrumbCount - 1 ? ' text-orange-400 font-bold' : ''}`}>
          {path}
        </Link>
        {index < breadcrumbCount - 1 && <span className="mx-1.5">/</span>}
      </React.Fragment>
    ));
  }

  return (
    <>
      <div style={{backgroundImage: `url(${warehouseImage})`}} className="relative header-bg-image z-0"></div>
      <header className="orange-header-gradient z-50">
          <div className="grid grid-cols-2">
            <section className="name-image p-5">
                <h1 className="text-white font-bold text-2xl flex">
                  {viewName} {productCountChipContent} 
                </h1>
            </section>
            <section className="right-side text-end p-5 grid grid-cols-5">
              <div className="search col-span-4">
                {searchContent}
              </div>
              <div className="profile px-2 py-1">
                <p className="flex float-right cursor-default">
                  {user ? user.username : 'Username'}
                  <Icon className="cursor-pointer relative top-1 ml-2" onClick={logout} icon="material-symbols:logout" />  
                </p>         
              </div>
              
            </section>
          </div>
          <nav className="bg-[#FDF7ED] px-5 py-1 border-b-gray-400 border nav-breadcumbs font-normal text-sm">
          <p>
            {generateBreadcrumbs()}
          </p>
        </nav>
      </header>
    </>
  )
}
