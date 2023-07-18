import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import HighLightText from '../components/core/HomePage/HighLightText'
import CTAButton from '../components/common/CTAButton'
import banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/HomePage/CodeBlock'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LLSection from '../components/core/HomePage/LLSection'
import instructor from '../assets/Images/Instructor.png'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'

const Home = () => {
   return (
      <div>
         {/* Section1 */}
         <div className='flex flex-col mx-auto w-11/12 items-center text-white'>

            <div className='inline-flex items-center flex-col gap-9 mt-16 w-[65%]'>

               <Link to={"/signup"}>

                  <div className='group gap-[0.375rem]  mx-auto rounded-full font-bold bg-richblack-800 text-richblack-200 transition-all hover:scale-95 w-fit' style={{ "box-shadow": "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset" }}>

                     <div className='flex flex-row items-center gap-[0.625rem] py-[0.375rem] px-[1.125rem] group-hover:bg-richblack-900 '>
                        <p className='text-center font-medium leading-6'>Become an Instructor</p>
                        <FaArrowRight className='w-4 h-4' />
                     </div>

                  </div>

               </Link>

               <div className='flex flex-col gap-4 items-center '>
                  <div className='text-4xl leading-[2.75rem] font-semibold first-letter  text-center'>
                     Empower Your Future with
                     <HighLightText text={" Coding Skills"} />
                  </div>
                  <div className='text-base font-medium font-inter text-richblack-300 text-center flex flex-col self-stretch '>
                     With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                  </div>
               </div>


               <div className='flex flex-col gap-6 md:flex-row '>
                  <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                  <CTAButton active={false} linkto={"/login"}>Book Demo</CTAButton>
               </div>
            </div>

            <div className='mx-3 my-16 w-5/6'
               style={{ "box-shadow": "20px 20px 0px 0px #F5F5F5" }}
            >
               <video muted loop autoPlay>
                  <source src={banner} type='video/mp4'></source>
               </video>
            </div>


            <CodeBlock
               position={"flex-row"}
               beforehead={"Unlock your"}
               highlight={" coding potential "}
               afterhead={"with our online course"}
               subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
               cta1={{
                  text: "Try it Yourself",
                  linkto: "/signup",
                  active: true,
               }}
               cta2={{
                  text: "Learn More",
                  linkto: "/login",
                  active: false,
               }}
               code={
                  `<!DOCTYPE html>\n
            <html>\n
            <head><title>Example</title>\n
            <link rel="stylesheet"href="styles.css">\n
            </head>\n
            <body>\n
            <h1><a href="/"> Hello 😀 learn HTML </h1>\n
            <h1><a href="/"> from 🙂 zero </h1>\n
            <h1><a href="/"> to 😎 hero </h1>\n
            </body>
            `
               }
               bg={"linear-gradient(144deg, #8A2BE2 0%, #FFA500 50%, #F8F8FF 100%)"}
               codecolor={"#ffffff"}
            />
            <CodeBlock
               position={"flex-row-reverse"}
               beforehead={"Start"}
               highlight={" coding in seconds"}
               afterhead={""}
               subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."}
               cta1={{
                  text: "Continue Lesson",
                  linkto: "/signup",
                  active: true,
               }}
               cta2={{
                  text: "Learn More",
                  linkto: "/login",
                  active: false,
               }}
               code={
                  `<!DOCTYPE html>\n
                  <html>\n
                  <head><title>Example</title>\n
                  <link rel="stylesheet"href="styles.css">\n
                  </head>\n
                  <body>\n
                  <h1><a href="/"> Hello 😀 learn HTML </h1>\n
                  <h1><a href="/"> from  🙂 zero </h1>\n
                  <h1><a href="/"> to    😎 hero </h1>\n
                  </body>
                  `
               }
               bg={"linear-gradient(138deg, #1FA2FF 0%, #12D8FA 50%, #A6FFCB 100%)"}
               codecolor={"#3ee4ec"}
            />

            <ExploreMore />
         </div>

         <div className='bg-pure-greys-5 text-richblack-700'>

            <div className='homepage_bg pb-12 pt-40'>
               <div className='flex flex-col sm:flex-row gap-6 justify-center items-center h-40 w-11/12 max-w-maxContent mx-auto'>
                  <CTAButton active={true}>
                     <div className='flex gap-2 items-center '>
                        Explore Full Catalog
                        <FaArrowRight />
                     </div>
                  </CTAButton>
                  <CTAButton linkto={"/signup"}>Learn More</CTAButton>
               </div>
            </div>

            <div className='w-11/12 mx-auto flex flex-col gap-14'>
               <div className='flex flex-col sm:flex-row justify-between items-center p-3 lg1:px-28 lg1:py-24 gap-3'>
                  <div className='sm:w-[45%] font-inter not-italic text-4xl leading-[2.75rem] font-semibold first-letter  '>
                     Get the skills you need for a
                     <HighLightText text={" job that is in demand."} />
                  </div>

                  <div className='sm:w-[45%]'>
                     <div className='text-base font-medium font-inter text-richblack-500 flex flex-col self-stretch '>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                     </div>
                     <div className='w-fit mt-9 '>
                        <CTAButton active={true} linkto={"signup"} >
                           Learn More
                        </CTAButton>
                     </div>
                  </div>
               </div>

               <TimeLineSection />
               <LLSection />

               <div className='mx-auto'>
                  <CTAButton active={true} linkto={"/signup"}>
                     Learn More
                  </CTAButton>
               </div>
            </div>

            <div className='px-28 py-20 flex flex-col lg1:flex-row justify-center items-center gap-24 bg-richblack-900 mt-20'>

               <img src={instructor} alt='Become an Tutor' className=' sm:w-[90%] lg1:w-[100%] max-w-fit' style={{ "box-shadow": "-20px -20px 0px 0px #FFF" }} />


               <div className={`flex flex-col gap-3 w-fit max-w-[480px]`}>

                  <div className='font-inter not-italic text-4xl leading-[2.75rem] font-semibold first-letter  text-white'>
                     Become an <br />
                     <HighLightText text={"instructor"} />
                  </div>

                  <div className='text-base font-medium font-inter text-richblack-300 flex flex-col self-stretch '>
                     Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                  </div>

                  <div className='pt-14'>
                     <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-2 items-center'>
                           Start Teaching Today
                           <FaArrowRight />
                        </div>
                     </CTAButton>

                  </div>
               </div>

            </div>

         </div>
         
         <Footer />
      </div>
   )
}

export default Home