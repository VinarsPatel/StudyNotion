const mongoose = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const { uploadMedia } = require("../utils/mediaUploader");
require("dotenv").config();

//profile is initialized with null details at the time of sign up so updation is needed instead od creation 
exports.updateProfile = async (req, res) => {
   try {
      //get data 
      const { firstName, LastName, profession, gender, dateOfBirth, about, contactNumber } = req.body;
      const userID = req.user.id;

      if (!gender) {
         return res.status(400).json({
            success: false,
            message: "Fill in required details."
         });
      }

      const userD = await User.findByIdAndUpdate({ _id: userID }, {
         firstName: firstName,
         LastName: LastName,
      }
         , { new: true, });

      const profileID = userD.additionalDetails;

      const updatedProfile = await Profile.findByIdAndUpdate(profileID,
         {
            profession,
            gender,
            dateOfBirth,
            contactNumber,
            about,
         },
         { new: true }
      );

      const updatedUser = await User.findById(userD._id).populate("additionalDetails");

      return res.status(200).json({
         success: true,
         data: updatedUser,
         message: "Profile details updated Succesfully.",
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Profile details updation failed."
      });
   }
}

exports.deleteAccount = async (req, res) => {
   try {
      //get data
      const userID = req.user.id;
      //validation
      const user = await User.findById(userID);
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User Account not found."
         });
      }

      //delete profile entry
      await Profile.findByIdAndDelete(user.additionalDetails);
      //delete OTP
      await OTP.findOneAndDelete({ email: user.email });
      //delete Ratings and Reviwes
      await RatingAndReview.findOneAndDelete({ user: userID });
      //delete courseProgress
      await CourseProgress.findByIdAndDelete(user.courseProgress);

      //🟦🟥🟩🟦🟥🟩 is it necessery to delete user id from the course same answer as of deletion of sub section
      //🟦🟥🟩Schedule a request/Job/Task ==> chroneJob

      //delete user entry
      await User.findByIdAndDelete(userID);


      return res.status(200).json({
         success: true,
         message: "Account deleted Succesfully.",
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Account deletion failed."
      });
   }
}

exports.getAllUserDetails = async (req, res) => {
   try {
      const id = req.user.id;
      const userDetails = await User.findById(id)
         .populate("additionalDetails")
         .exec();
      console.log(userDetails);
      res.status(200).json({
         success: true,
         message: "User Data fetched successfully",
         data: userDetails,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

exports.updateDisplayPicture = async (req, res) => {
   try {
      const userId = req.user.id
      const file = req.files.displayPicture;

      if (!file) {
         return res.status(400).json({
            success: false,
            message: "File missing."
         })
      }

      const image = await uploadMedia(file, process.env.FOLDER_NAME, 1000,
         1000);

      const updatedUser = await User.findByIdAndUpdate(
         { _id: userId },
         { image: image.secure_url },
         { new: true }
      )
      res.send({
         success: true,
         message: `Image Updated successfully`,
         data: updatedUser,
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      })
   }
}

exports.getEnrolledCourses = async (req, res) => {
   try {
      const userId = req.user.id
      const user = await User.findById(userId)
         .populate("courses")
         .exec();

      if (!user) {
         return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userId}`,
         })
      }

      return res.status(200).json({
         success: true,
         data: user.courses,
      })
   
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      })
   }
};