import React, { useState } from 'react';
import warehouseImage from "../assets/images/warehouse_img.jpg"
import SearchBox from './SearchBox'
import { useAuth } from '../auth/AuthContext.jsx'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export default function Header({ viewName, productName, productCount, search, onSearch, searchField, visualPath, linkPath}) {

  const { user, logout } = useAuth();
  const [isProfileVisible, setIsProfileVisible] = useState(false);

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

  const createUserButton = () => {
    let firstLetter = user.username.charAt(0).toUpperCase();
    return(
      <button onClick={toggleProfileVisibility} className="bg-[#F0CD97] relative -mt-2 top-[5px] px-2.5 py-0.5 rounded-full mr-2 text-xl text-black">
        {firstLetter}
      </button>
    );
  }

  const toggleProfileVisibility = () => {
    setIsProfileVisible((prevVisibility) => !prevVisibility);
  };

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
            <section className="right-side text-end p-5 grid grid-cols-11">
              <div className="search col-span-10">
                {searchContent}
              </div>
              <div className="profile px-2 py-1">
                <p className="flex float-right cursor-default">
                  {createUserButton()}
                  <div style={{ display: isProfileVisible ? 'block' : 'none' }} className="profile absolute top-[4em] right-[2em] w-[200px] h-[80px] rounded py-2 px-3 bg-[#FDF7ED] shadow-2xl text-left">
                    <p className="mb-2 font-bold flex text-center items-center">{user.username == "admin" ? 
                      <span className="flex items-center mr-1 text-md w-full bg-black border border-black rounded text-white px-1">
                        <Icon className="mr-1" icon="clarity:administrator-solid" /> {user.username}
                      </span>
                        : 
                        <span className="flex items-center mr-1 text-md w-full shadow-lg bg-white border border-black rounded text-black px-1">
                          <Icon className="mr-1" icon="mdi:user" /> {user.username}
                        </span>
                    } </p>
                    <button onClick={logout} className="bg-orange-400 w-full p-1 text-black items-center px-2 rounded inline-flex">
                      <Icon className="mr-1" icon="material-symbols:logout" /> Logout
                    </button>
                  </div>
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
