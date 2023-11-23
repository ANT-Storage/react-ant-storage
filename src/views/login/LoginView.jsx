import React from 'react'
import background from '../../assets/images/loginBg.png'
import logoImg from '../../assets/images/logo.png'
import logisticsImg from '../../assets/images/logisticsImg.svg'

export default function LoginView() {
  return (
    <>
      <div className="login absolute w-full h-full bg-red-400 bg-cover p-4" style={{backgroundImage: `url(${background})`}}>
        <div className="grid grid-cols-2">
          <div>
              <img src={logoImg} className="w-[8em]" alt="" />
            <div className="px-5">
              <p className="text-[#C0C0C0] font-bold">
                Welcome back to <span className="text-black">Your</span> <span class="text-[#E39945]">Warehouse</span>
              </p>
              <div className="login-box mt-[3em]">
                <label htmlFor="" className="block font-semibold text-sm my-1">Username</label>
                <input type="text" className="w-[16em] mb-4 py-1 px-3 outline-none bg-[#FDF7ED] rounded-full border border-[#E39945]" />

                <label htmlFor="" className="block font-semibold text-sm my-1">Password</label>
                <input type="password" className="w-[16em] mb-4 py-1 px-3 outline-none bg-[#FDF7ED] rounded-full border border-[#E39945]" />
              
                <button className="block text-white text-center rounded-full py-2 px-2 w-[10em] my-4 bg-[#E39945]">
                  LOGIN
                </button>
              </div>
            </div>
          </div>
          <div>
            <img src={logisticsImg} className="w-[30em] mt-[5em]" alt="" />
          </div>
        </div>
        
      </div>
    </>
  )
}
