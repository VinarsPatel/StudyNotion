import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
   return (
      <div>
         <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Profile
         </h1>
         <div className='flex flex-col gap-5'>
            <ChangeProfilePicture />
            <EditProfile />
            <ChangePassword/>
            <DeleteAccount/>
         </div>
      </div>
   )
}

export default Settings