import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import CategoryCard from './CategoryCard.jsx';

export default function CategoriesView() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const linkPath = [
    "/dashboard",
    "/categories",
  ];

  const handleSearch = (searchTerm, field) => {
    const filteredResults = categories.filter((item) => {
      console.log(item[field]);
      const fieldValue = item && item[field] ? item[field].toLowerCase() : '';
      return fieldValue.includes(searchTerm.toLowerCase());
    });
  
    setFilteredCategories(filteredResults);
  };

  function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/antstorage/v1/categories", requestOptions)
      .then(response => response.json())  // Assuming the response is JSON
      .then(result => setCategories(result))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <>
      <Header 
        viewName={"Categories"} 
        productCountChip={false} 
        search={true} 
        onSearch={handleSearch}
        searchField={'name'}
        visualPath={"Dashboard / Categories"}
        linkPath={linkPath}  
      />
      <main className="relative">
        <section className="grid grid-cols-4 gap-4 mx-4 mt-2">
        {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <CategoryCard key={category.id} id={category.id} name={capitalizeFirstLetter(category.name)} />
            ))
          ) : (
            categories.map(category => (
              <CategoryCard key={category.id} id={category.id} name={capitalizeFirstLetter(category.name)} />
            ))
          )}
        </section>
      </main>
    </>
  );
}
