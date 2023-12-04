import { React, useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Table from '../../components/Table.jsx';
import { useParams } from 'react-router-dom';

export default function ProductListView() {

  const { categoryId } = useParams();
  const hiddenColumns = ['id','url_img','category_id'];

  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (searchTerm, field) => {
    const filteredResults = products.filter(item =>
      item[field].toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filteredResults);
  };

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`http://localhost:8080/antstorage/v1/categories/${categoryId}`, requestOptions)
      .then(response => response.json())  // Assuming the response is JSON
      .then(result => setCategory(result))
      .catch(error => console.log('error', error));

    fetch(`http://localhost:8080/antstorage/v1/category/${categoryId}/products`, requestOptions)
      .then(response => response.json())  // Assuming the response is JSON
      .then(result => setProducts(result))
      .catch(error => console.log('error', error));
    


  }, []);

  return (
    <div>
      <Header 
        viewName={category.name}
        productCount={products.length}
        search={true} searchField={"name"}
        onSearch={handleSearch}
        path={`Dashboard / Categories / ${category.name}`}/>
      <main className="relative">
        <Table items={products} hiddenColumns={hiddenColumns} linkField={"name"} linkFieldEnabled={true} />
      </main>
    </div>
  )
}
