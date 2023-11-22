import React from 'react'
import { Icon } from '@iconify/react'

export default function DashboardCard({iconName, iconColor, title, description}) {
  return (
    <article className="p-4 border shadow-md mb-1 cursor-pointer hover:shadow-xl">
        <div className="icon w-[3em] h-[3em] rounded-md p-[9px] mt-2" style={{backgroundColor: iconColor}}>
            <Icon icon={iconName} className="text-3xl" />
        </div>
        <h1 className="text-black font-bold text-xl mt-3">{title}</h1>
        <p className="text-[#B7B7B7] relative -top-1">{description}</p>
    </article>
  )
}
