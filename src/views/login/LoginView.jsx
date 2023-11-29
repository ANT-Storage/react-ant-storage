import React, { useState } from 'react'
import background from '../../assets/images/loginBg.png'
import logoImg from '../../assets/images/logo.png'
import logisticsImg from '../../assets/images/logisticsImg.svg'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';

export default function LoginView() { 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/antstorage/v1/users/login?username=${username}&password=${password}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          login(result);
          navigate('/dashboard', { replace: true });
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      
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

                <form onSubmit={handleLogin}>
                  <label className="block font-semibold text-sm my-1">Username</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-[16em] mb-4 py-1 px-3 outline-none bg-[#FDF7ED] rounded-full border border-[#E39945]"
                    required  
                  />

                  <label className="block font-semibold text-sm my-1">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[16em] mb-4 py-1 px-3 outline-none bg-[#FDF7ED] rounded-full border border-[#E39945]"
                    required 
                   />

                  {error && <p style={{ color: 'red' }}>{error}</p>}

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
