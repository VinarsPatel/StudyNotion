import React from 'react'
import girl from '../../../assets/Images/TimelineImage.png'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import { TfiLineDotted } from 'react-icons/tfi'
const data = [
   {
      logo: Logo1,
      heading: "Leadership",
      desc: "Fully committed to the success company",
   },
   {
      logo: Logo2,
      heading: "Responsibility",
      desc: "Students will always be our top priority",
   },
   {
      logo: Logo3,
      heading: "Flexibility",
      desc: "The ability to switch is an important skills",
   },
   {
      logo: Logo4,
      heading: "Solve the problem",
      desc: "Code your way to a solution",
   },
]
const TimeLineSection = () => {
   return (

      <div className='flex flex-col justify-center items-center lg1:flex-row lg1:items-start gap-[6%]'>
         <div className='flex flex-col gap-6 mr-10'>
            {
               data.map((ele, index) => {
                  return (
                     <div className='flex flex-row py-4 px-3 gap-6 items-center relative' key={index}>
                        <div className='rounded-full h-[50px] w-[50px] flex justify-center items-center bg-white' key={index}>
                           <img src={ele.logo} alt='' />
                        </div>

                        <div className='flex flex-col'>
                           <div className='font-semibold text-base '>{ele.heading}</div>
                           <div>{ele.desc}</div>
                        </div>
                        <TfiLineDotted className='h-10 w-10 text-richblack-100 absolute rotate-90 -bottom-9 left-[4.5%]'></TfiLineDotted>
                     </div>
                  )
               })
            }
         </div>
         <div className='lg1:w-[50%] relative flex flex-col items-center'>
            <img src={girl} alt=''></img>
            <div className='flex gap-14 p-10 bg-caribbeangreen-700  w-fit translate-y-[-50%]' >
               
               <div className='flex gap-5 items-center justify-between '>
                  <div className='text-white text-4xl font-bold ' >10</div>
                  <div className='flex flex-col text-caribbeangreen-300'>
                     <p>YEARS</p>
                     <p>EXPERIENCE</p>
                  </div>
               </div>
               
               <div className='w-[0.0625rem] bg-[#037957]'></div>

               <div className='flex gap-5 items-center justify-between '>
                  <div className='text-white text-4xl font-bold ' >250</div>
                  <div className='flex flex-col text-caribbeangreen-300'>
                     <p>TYPES OF</p>
                     <p>COURSES</p>
                  </div>
               </div>
               
            </div>
         </div>
      </div>
   )
}

export default TimeLineSection