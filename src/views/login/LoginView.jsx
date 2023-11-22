import React from 'react'
import background from '../../assets/images/loginBg.png'
import logoImg from '../../assets/images/logo.png'

export default function LoginView() {
  return (
    <>
      <div className="login absolute w-full h-full bg-red-400 bg-cover p-4" style={{backgroundImage: `url(${background})`}}>
        <img src={logoImg} className="w-[8em]" alt="" />
        <div className="px-5">
          <p className="text-[#C0C0C0] font-bold">
            Welcome back to <span className="text-black">Your</span> <span class="text-[#E39945]">Warehouse</span>
          </p>
        </div>
      </div>
    </>
  )
}
