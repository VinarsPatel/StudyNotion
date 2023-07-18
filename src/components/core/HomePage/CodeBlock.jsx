import React from 'react'
import CTAButton from '../../common/CTAButton'
import HighLightText from './HighLightText'
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'
import './cb.css'

const CodeBlock = ({ position, beforehead, highlight, afterhead, subheading, cta1, cta2, code, bg }) => {
   return (
      <div className={`jj flex ${position} py-14 items-center justify-around w-fit`}
      
      >

         <div className='w-[40%] flex justify-center'>
            <div className={`flex flex-col gap-3 max-w-[900px]`}>

               <div className='font-inter not-italic text-4xl leading-[2.75rem] font-semibold first-letter  text-white'>
                  {beforehead}
                  <HighLightText text={highlight} />
                  {afterhead}
               </div>

               <div className='text-base font-medium font-inter text-richblack-300 flex flex-col self-stretch '>
                  {subheading}
               </div>

               <div className='pt-14 flex flex-row gap-6'>
                  <CTAButton active={cta1.active} linkto={cta1.linkto}>
                     <div className='flex gap-2 items-center'>
                        {cta1.text}
                        <FaArrowRight />
                     </div>
                  </CTAButton>
                  <CTAButton active={cta2.active} linkto={cta2.linkto}>
                     {cta2.text}
                  </CTAButton>

               </div>
            </div>
         </div>

         <div className='relative flex gap-1 max-w-[720px] min-w-[450px] py-8 justify-center p-2 border border-black'
            style={{
               "background": "linear-gradient(141deg, rgba(14, 26, 45, 0.24) 0%, rgba(17, 30, 50, 0.38) 100%)",
               "backdropFilter": "blur(26px)",
            }}
         >

            <div className='text-center w-[10%] flex flex-col items-center py-1 gap-[0.275rem] text-richblack-400 font-bold font-mono'
               style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.35rem",
               }}
            >
               <p>1</p>
               <p>2</p>
               <p>3</p>
               <p>4</p>
               <p>5</p>
               <p>6</p>
               <p>7</p>
               <p>8</p>
               <p>9</p>
               <p>10</p>
               <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col font-mono pt-[0.2rem] leading-[0.85rem] text-[#ffd60a]`}
               style={{ fontSize: "1rem" }}
            >
               <TypeAnimation
                  sequence={[code, 2000, ""]}
                  repeat={Infinity}
                  omitDeletionAnimation={true}
                  style={
                     {
                        whiteSpace: "pre-line",
                        display: "block",
                     }}
               />
            </div>

            <div className='absolute rounded-[23rem] opacity-20 blur-[34px] w-[25rem] h-[19rem] top-[-1rem] -left-1'
               style={{ background: `${bg}` }}
            ></div>

         </div>

      </div>
   )
}
export default CodeBlock