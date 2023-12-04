import { React, useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Table from '../../components/Table.jsx';
import { useParams } from 'react-router-dom';

function UsersListView() {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const hiddenColumns = ['id','password'];

    const handleSearch = (searchTerm, field) => {
      const filteredResults = users.filter((item) => {
        console.log(item[field]);
        const fieldValue = item && item[field] ? item[field].toLowerCase() : '';
        return fieldValue.includes(searchTerm.toLowerCase());
      });
    
      setFilteredUsers(filteredResults);
    };

    useEffect(() => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8080/antstorage/v1/users", requestOptions)
        .then(response => response.json())  // Assuming the response is JSON
        .then(result => setUsers(result))
        .catch(error => console.log('error', error));
  
    }, []);

      function capitalizeFirstLetter(inputString) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
      }


    return (
        <>
        <Header 
          viewName={"Users"} 
          search={true}
          searchField={'username'}
          onSearch={handleSearch} 
          path={`Dashboard / Users`}/>
        <main className="relative">
            <Table 
              items={filteredUsers.length > 0 ? filteredUsers : users}
              hiddenColumns={hiddenColumns}
              linkField={'username'}
              linkFieldEnabled={true}
            />
        </main>
        </>
    )
}

export default UsersListView
