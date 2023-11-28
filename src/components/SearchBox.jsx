import React from 'react'
import { Icon } from '@iconify/react'

export default function SearchBox() {
  return (
    <>
        <div className="relative w-3/4 float-right">
            <input 
                type="text" 
                id="search-box" 
                className="block py-1.5 px-3 w-full z-20 text-sm rounded-xl bg-white outline-none"
                placeholder="Search" 
                required
            />
            <button type="submit" className="absolute top-0 end-0 py-1.5 px-3 text-sm font-medium h-full rounded-full">
                <Icon icon="material-symbols:search" className="text-lg text-orange-400 font-bold" />
            </button>
        </div>
        
    </>
    
  )
}
