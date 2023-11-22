import React from 'react'
import Header from '../../components/Header.jsx'
import DashboardCard from './DashboardCard.jsx'

export default function DashboardView() {
  return (
    <div>
      <Header viewName={"Dashboard"} productCountChip={false} search={false} path={""}/>
      <main className="relative">
        <section className="grid grid-cols-2 gap-8 mx-8 mt-7">
            <DashboardCard 
                iconName={"uil:box"}
                iconColor={"#F8E7CD"}
                title={"Categories & Products"} 
                description={"Manage your products"}
            />
            <DashboardCard 
                iconName={"ph:users-bold"}
                iconColor={"#F0CD97"}
                title={"Users"} 
                description={"Manage your users & permissions"}
            />
            <DashboardCard 
                iconName={"bx:file"}
                iconColor={"#E8AE61"}
                title={"Audit log"} 
                description={"Check  all the actions with detail"}
            />
            <DashboardCard 
                iconName={"material-symbols:settings-outline"}
                iconColor={"#E39945"}
                title={"Configuration"} 
                description={"Preferences & configuration"}
            />
        </section>
      </main>
    </div>
  )
}
