import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import ChangeProfile from './ChangeProfile'

const Settings = () => {
   return (
      <div>
         <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Profile
         </h1>
         <ChangeProfilePicture />
         <ChangeProfile/>
      </div>
   )
}

export default Settings