import { React, useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Table from '../../components/Table.jsx';
import LogsTable from '../../components/LogsTable.jsx';

function AuditLogView() {

    const [logs, setLogs] = useState([]);
    const hiddenColumns = ['id','url_img','category_id'];
    const linkPath = [
        "/dashboard",
        "/auditlog",
      ];

    function capitalizeFirstLetter(inputString) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }

    return (
        <div>
            <Header 
                viewName={"Audit Log"} 
                productCountChip={false} 
                search={false} 
                visualPath={"Dashboard / Audit log"}
                linkPath={linkPath}  
            />
            <main className="relative">
                <LogsTable/>
            </main>
        </div>
    )
}

export default AuditLogView
