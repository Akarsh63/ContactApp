import React, { useState } from 'react'
import Loginpage from './Loginpage'
import Registrationpage from './Registrationpage'

export default function Auth() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
       
        <div className={`maincontainer ${isHovered ? 'hovered' : ''}`}>
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
            <div className="flip-card-front">
                <Loginpage handleFlip={handleFlip} setIsHovered={setIsHovered} />
            </div>
            <div className="flip-card-back">
                <Registrationpage handleFlip={handleFlip} setIsHovered={setIsHovered}/>
            </div>
        </div>
      </div>
      <div className='headingabs'>
        CONTACT MANAGER
      </div>
    </div>
  )
}
