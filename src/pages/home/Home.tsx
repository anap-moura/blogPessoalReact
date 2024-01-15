import React from 'react'
import './Home.css'
import homeLogo from '../../assets/Tablet login-pana.png'

const Home = () => {
  return (
   <>
   <h1 className='titulo'>Home</h1>

   <img src={homeLogo} className='img'  alt="imagem de tela inicial/login" />
   </>
    
  )
}

export default Home