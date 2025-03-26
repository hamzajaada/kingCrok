import React from 'react'
import feauter1 from '../../asset/images/fauter1.png'
import feauter2 from '../../asset/images/Mask Group 4.png'
export default function () {
  return (
    <div className='w-full  h-auto  lg:h-96 '>
         <img src={feauter1} className='w-full h-full hidden lg:block' alt="" srcset="" />
         <img src={feauter2} className='w-full h-full lg:hidden block' alt="" srcset="" />
    </div>
  )
}
