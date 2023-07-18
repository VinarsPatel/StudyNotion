import React from 'react'
import HighLightText from '../components/core/HomePage/HighLightText';
const PageNotFound = () => {
   return (
      <div className='flex flex-col h-[calc(100vh-3.5rem)] min-h-[500px] min-w-[600px] gap-8 items-center justify-center w-[100vw] font-mono bg-richblack-800 '
      >
         <h1 className='text-4xl text-[#d72631] bg-richblack-900 p-5 rounded-lg '>Error 404 - Page Not Found</h1>
         <div className='w-[90%] text-3xl text-center text-white  bg-richblack-900 rounded-3xl p-5'>
            <p>Are you in search of a <HighLightText text={"soulmate"} />? </p>
            <p>
               Because this page seems to have wandered off much like the <HighLightText text={"elusive quest"} bg={"-webkit-linear-gradient(#E65C00, #F9D423)"} /> for finding your <HighLightText text={"one true love"} bg={"-webkit-linear-gradient(#DD2476, #FF512F)"} />.
            </p>
            <p>But don't worry, <HighLightText text={"true love (and the right page)"} bg={"-webkit-linear-gradient(#11998E, #38EF7D)"} /> is out there, waiting to be discovered!</p>
         </div>
      </div>

   )
}

export default PageNotFound