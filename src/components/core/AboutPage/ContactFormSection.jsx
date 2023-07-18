import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactFormSection = () => {
   return (
      <div className='flex flex-col gap-4 pb-32 items-center'>
         <h2 className='text-4xl leading-[2.75rem] font-semibold text-center'>
         Get in Touch
         </h2>
         <p className='text-base font-medium font-inter text-richblack-300 text-center self-stretch '>
         We&apos; d love to here for you, Please fill out this form.
         </p>
         <ContactUsForm customWidth={" max-w-[460px]  min-w-[400px]"}/>
      </div>
   )
}

export default ContactFormSection