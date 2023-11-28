import React, { useState } from 'react'
import background from '../../assets/images/loginBg.png'
import logoImg from '../../assets/images/logo.png'
import logisticsImg from '../../assets/images/logisticsImg.svg'

export default function LoginView() { 

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/antstorage/v1/users/login?username=${formData.username}&password=${formData.password}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));



    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div className="login absolute w-full h-full bg-red-400 bg-cover p-4" style={{backgroundImage: `url(${background})`}}>
        <div className="grid grid-cols-2">
          <div>
              <img src={logoImg} className="w-[8em]" alt="" />
            <div className="px-5">
              <p className="text-[#C0C0C0] font-bold">
                Welcome back to <span className="text-black">Your</span> <span className="text-[#E39945]">Warehouse</span>
              </p>
              <div className="login-box mt-[3em]">

                <form onSubmit={handleSubmit}>
                  <label className="block font-semibold text-sm my-1">Username</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-[16em] mb-4 py-1 px-3 outline-none bg-[#FDF7ED] rounded-full border border-[#E39945]"
                    required  
                  />

                  <label className="block font-semibold text-sm my-1">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-[16em] mb-4 py-1 px-3 outline-none bg-[#FDF7ED] rounded-full border border-[#E39945]"
                    required 
                   />
                
                  <button 
                  type="submit"
                  className="block text-white text-center rounded-full py-2 px-2 w-[10em] my-4 bg-[#E39945]">
                    LOGIN
                  </button>
                </form>
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
