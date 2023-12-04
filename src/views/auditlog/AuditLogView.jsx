import { React, useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Table from '../../components/Table.jsx';

function AuditLogView() {

    const [logs, setLogs] = useState([]);
    const hiddenColumns = ['id','url_img','category_id'];

    function capitalizeFirstLetter(inputString) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }

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

    return (
        <div>
        <Header viewName={"Audit Log"} search={true} path={`Dashboard / Audit Log`}/>
        <main className="relative">
            <Table items={logs} hiddenColumns={hiddenColumns} linkField={"name"} linkFieldEnabled={true} />
        </main>
        </div>
    )
}

export default AuditLogView
