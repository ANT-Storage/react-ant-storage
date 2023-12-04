import { React, useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Table from '../../components/Table.jsx';
import { useParams } from 'react-router-dom';

function UsersListView() {

    const [users, setUsers] = useState([]);
    const hiddenColumns = ['id','password'];

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
        <Header viewName={"Users"} search={true} path={`Dashboard / Users`}/>
        <main className="relative">
            <Table items={users} hiddenColumns={hiddenColumns} linkField={"username"}/>
        </main>
        </>
    )
}

export default UsersListView
