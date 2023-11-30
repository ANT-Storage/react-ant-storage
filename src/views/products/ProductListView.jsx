import { React, useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Table from '../../components/Table.jsx';
import { useParams } from 'react-router-dom';


export default function ProductListView() {

  const { categoryName } = useParams();
  const hiddenColumns = ['url_img','category_id'];

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/antstorage/v1/products", requestOptions)
      .then(response => response.json())  // Assuming the response is JSON
      .then(result => setProducts(result))
      .catch(error => console.log('error', error));


  }, []);

  function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }



  return (
    <div>
      <Header viewName={capitalizeFirstLetter(categoryName)} productCount={products.length} search={true} path={`Dashboard / Categories / ${capitalizeFirstLetter(categoryName)}`}/>
      <main className="relative">
        <Table items={products} hiddenColumns={hiddenColumns} linkField={"name"}/>
      </main>
    </div>
  )
}
