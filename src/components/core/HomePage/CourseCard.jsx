import React from 'react'
import { HiUsers } from 'react-icons/hi'
import { PiGitForkFill } from 'react-icons/pi'

const CourseCard = ({ currCard, setCurrCard, data }) => {

   return (
      <div className={`${currCard === data.heading ? " bg-white " : " bg-richblack-800 "} flex flex-col justify-between md:h-[430px] md:w-[250px] lg:w-[300px] lg:h-[330px]`}
         style={{ "box-shadow": `${currCard === data.heading ? "15px 15px 0px 0px #ffd60a " : " "}`, }}
         onClick={() => { setCurrCard(data.heading) }}
      >
         <div className='px-6 py-8 flex flex-col gap-3 '>
            <p className={`${currCard === data.heading ? " text-richblack-800 " : " text-richblack-25 "} 
                           font-inter font-semibold text-xl `}

            >
               {data.heading}
            </p>
            <p className={`${currCard === data.heading ? " text-richblack-500 " : " text-richblack-300 "} 
                           font-inter font-normal text-base `}>
               {data.description}
            </p>
         </div>

         <div className={'flex flex-col sm:flex-row  lg:flex-row justify-between mt-14 px-4 pb-6 pt-2   gap-2 border-dashed border-t-2 border-richblack-300 '}>
            <div className='flex items-center gap-2'>
               <HiUsers className={`${currCard === data.heading ? " text-blue-300 " : " text-richblack-400 "} text-xl`} />
               <p className={`${currCard === data.heading ? " text-blue-500 " : " text-richblack-300 "} 
                           font-inter font-normal text-base `}>
                  {data.level}
               </p >
            </div>
            <div className='flex justify-end items-center gap-2'>

               <PiGitForkFill className={`${currCard === data.heading ? " text-blue-300 " : " text-richblack-400 "} 
                           font-inter font-normal text-2xl rotate-180 `} />

               <p className={`${currCard === data.heading ? " text-blue-500 " : " text-richblack-300 "} 
                           font-inter font-normal text-base `}>


                  {data.lessionNumber}  Lessons</p>
            </div>
         </div>
      </div>
   )
}

export default CourseCard