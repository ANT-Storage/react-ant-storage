import React from 'react'
import { Icon } from '@iconify/react'

export default function Table({ items }) {
    
    let tableItem =
    <>
        <tr className="text-[#929292] border-b">
                            <th scope="row" className="px-6 py-2 font-medium">
                             <input type="checkbox" className="inline-block relative top-0.5 mr-1"/> SA098987SDFASF07
                            </th>
                            <td className="px-6 py-2 font-semibold">
                                Air Max 4309
                            </td>
                            <td className="px-6 py-2">
                                Sport Wear
                            </td>
                            <td className="px-6 py-2">
                                <span className="bg-white text-black border-[#F0CD97] border-2 text-xs rounded-full py-1 px-2 mr-2">
                                    Sport
                                </span>
                                <span className="bg-white text-black border-[#F0CD97] border-2 text-xs rounded-full py-1 px-2 mr-2">
                                    Sport
                                </span>
                                <span className="bg-white text-black border-[#F0CD97] border-2 text-xs rounded-full py-1 px-2 mr-2">
                                    Sport
                                </span>
                            </td>
                            <td className="px-6 py-2">
                                123
                            </td>
        </tr>
        <tr className="text-[#929292] border-b bg-[#F9F9F9]">
                            <th scope="row" className="px-6 py-2 font-medium">
                                <input type="checkbox" className="inline-block relative top-0.5 mr-1"/> SA098987SDFASF07
                            </th>
                            <td className="px-6 py-2 font-semibold">
                                Air Max 4309
                            </td>
                            <td className="px-6 py-2">
                                Sport Wear
                            </td>
                            <td className="px-6 py-2">
                                <span className="bg-white text-black border-[#F0CD97] border-2 text-xs rounded-full py-1 px-2 mr-2">
                                    Sport
                                </span>
                                <span className="bg-white text-black border-[#F0CD97] border-2 text-xs rounded-full py-1 px-2 mr-2">
                                    Sport
                                </span>
                                <span className="bg-white text-black border-[#F0CD97] border-2 text-xs rounded-full py-1 px-2 mr-2">
                                    Sport
                                </span>
                            </td>
                            <td className="px-6 py-2">
                                123
                            </td>
        </tr>
    </>;


    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right ">
                    <thead className="text-xs font-semibold bg-[#E39945] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-2">
                                <input type="checkbox" className="inline-block relative top-0.5 mr-1"/> ID
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Tags
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((el, index) => 
                            tableItem
                        )}
                        
                    </tbody>
                </table>
            </div>

            <div className="pagination p-4">
                <div className="pagination-box border rounded-full px-2 w-[260px] float-right font-bold">
                <button className="bg-white py-1 px-2 text-[#797979] hover:text-black">
                    <Icon icon="mingcute:left-fill"  className="relative top-0.5"/>
                </button>
                <button className="bg-white py-1 px-3 text-[#797979] hover:bg-[#FDF7ED]">
                    1
                </button>
                <button className=" py-1 px-2 text-white bg-[#E8AE61] active">
                    2
                </button>
                <button className="bg-white py-1 px-3 text-[#797979] hover:bg-[#FDF7ED]">
                    3
                </button>
                <button className="bg-white py-1 px-3 text-[#797979] hover:bg-[#FDF7ED]">
                    ...
                </button>
                <button className="bg-white py-1 px-3 text-[#797979] hover:bg-[#FDF7ED]">
                    12
                </button>
                <button className="bg-white py-1 px-3 text-[#797979] hover:text-black">
                    <Icon icon="mingcute:right-fill" className="relative top-0.5" />
                </button>
                    
                </div>
            </div>
        </>
  )
}
