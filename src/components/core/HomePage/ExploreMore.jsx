import React, { useState } from 'react'
import { HomePageExplore as data } from '../../../data/homepage-explore'
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const ExploreMore = () => {
   const [currTab, setCurrTab] = useState(data[0].tag);
   const [courses, setCourses] = useState(data[0].courses);
   const [currCard, setCurrCard] = useState(data[0].courses[0].heading);

   const setMyCards = (value) => {
      setCurrTab(value);
      const result = data.filter((ele) => ele.tag === value);
      setCourses(result[0].courses);
      setCurrCard(result[0].courses[0].heading);
   }
   return (

      <div className='flex flex-col gap-4 font-inter translate-y-24 '>
         <div className='font-inter not-italic text-4xl leading-[2.75rem] font-semibold first-letter  text-center'>
            Unlock the
            <HighLightText text={" Power of Code"} />
         </div>

         <div className='text-base font-medium font-inter text-richblack-300 text-center flex flex-col self-stretch mx-auto'>
            Learn to Build Anything You Can Imagine
         </div>

         <div className='flex flex-wrap sm:flex-row justify-center bg-richblack-700 rounded-3xl mb-10 mx-auto border-richblack-100 px-1 py-1'>
            {data.map((ele, index) => {
               return (
                  <div className={`text-[16px] flex items-center gap-2 
                     ${currTab === ele.tag?" bg-richblack-900 text-richblack-5 font-medium ":
                                            " text-white "} 
                       transition-all duration-200 rounded-full cursor-pointer px-7 py-2 hover:text-richblack-100`}
                       key={index}
                       onClick={()=>{setMyCards(ele.tag)}}
                       >
                     {ele.tag}
                  </div>
               )
            })}
         </div>

         <div className='flex flex-col md:flex-row px-14 gap-9 justify-center items-center'>
            {
               courses.map((ele,index)=>{
                  return(
                     <CourseCard 
                     key={index} 
                     currCard={currCard}
                     setCurrCard={setCurrCard}
                     data={ele}
                     />
                  )
               })
            }
         </div>
      </div>
   )
}

export default ExploreMore