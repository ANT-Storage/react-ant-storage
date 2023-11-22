import React from 'react'
import Header from '../../components/Header.jsx'
import Table from '../../components/Table.jsx'

export default function ProductListView() {
  return (
    <div>
      <Header viewName={"Sudaderas"} productCountChip={true} search={true} path={"Home / Categories"}/>
      <main className="relative">
        <Table/>
      </main>
    </div>
  )
}
