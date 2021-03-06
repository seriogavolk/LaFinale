import React from 'react';
import Tilt from 'react-tilt';
import hackerlogo from './hackerlogo.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
         <Tilt className='Tilt br2 shadow-3' options={{max:55}} style={{height:150, width:150}}>
             <div className='Tilt-inner'><img alt='logo' src={hackerlogo}/></div>
         </Tilt>
        </div>
    )
}



export default Logo;