import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between h-16 w-full'>
        <div className='w-3/12 h-10 '>
            <img src='/marel-logo.png' className = 'object-scale-down h-10 '  />
            
        </div>
      
        <i className="fas fa-lg fa-lock border border-green-500 border-2 rounded-full p-3"></i>
   
        
    
    </div>
  )
}

export default Header