import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Table from '../../components/Table.jsx';
import { useParams } from 'react-router-dom';

export default function ProductListView() {
  const { categoryId } = useParams();
  const hiddenColumns = ['id', 'url_img', 'category_id'];

  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const linkPath = [
    "/dashboard",
    "/categories",
    `/categories/${categoryId}/products`
  ];

  const handleSearch = (searchTerm, field) => {
    const filteredResults = products.filter((item) => {
      console.log(item[field]);
      const fieldValue = item && item[field] ? item[field].toLowerCase() : '';
      return fieldValue.includes(searchTerm.toLowerCase());
    });
  
    setFilteredProducts(filteredResults);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResult, productsResult] = await Promise.all([
          fetchCategory(categoryId),
          fetchProducts(categoryId),
        ]);

        setCategory(categoryResult);
        setProducts(productsResult);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const fetchCategory = async (categoryId) => {
    const response = await fetch(`http://localhost:8080/antstorage/v1/categories/${categoryId}`);
    return response.json();
  };

  const fetchProducts = async (categoryId) => {
    const response = await fetch(`http://localhost:8080/antstorage/v1/category/${categoryId}/products`);
    return response.json();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header
        viewName={category.name}
        productCount={products.length}
        search={true}
        searchField={'name'}
        onSearch={handleSearch}
        visualPath={`Dashboard / Categories / ${category.name}`}
        linkPath={linkPath}
      />
      <main className="relative">
        <Table
          items={filteredProducts.length > 0 ? filteredProducts : products}
          objectName={"products"}
          hiddenColumns={hiddenColumns}
          linkField={'name'}
          linkFieldEnabled={true}
        />
      </main>
    </div>
  );
} 