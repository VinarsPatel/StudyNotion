import React from 'react'
import { StatsData } from '../../../data/aboutPageData'

const Stats = () => {
   return (
      <section className='w-full bg-richblack-800 grid mx-auto sm:grid-cols-4 gap-5 sm:gap-3 px-28 py-14 sm:py-20'>
         {StatsData.map((ele, index) => {
            return (<div key={index} className='flex flex-col justify-center items-center gap-3'>
               <p className='text-richblack-5 font-bold text-4xl'>{ele.count}</p>
               <p className='text-richblack-500 text-base font-semibold text-center'>{ele.label}</p>
            </div>)
         })}
      </section>
   )
}

export default Stats