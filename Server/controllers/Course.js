const Course = require("../models/Course");
const Category = require("../models/Category");
const { uploadMedia } = require("../utils/mediaUploader");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
   try {
      //get data
      let { courseName, description, learning, price, categoryID, tag, instructions } = req.body;
      let { status } = req.body;
      const { thumbnail } = req.files;

      //validation
      if (!courseName || !description || !learning || !price || !categoryID || !thumbnail || !tag) {
         return res.status(400).json({
            success: false,
            message: "Fill in all the details."
         });
      }

      if (!status || status === undefined) {
         status = "Draft";
      }

      const userId = req.user.id;

      //instruction and problem in Tags 👻🟥👻🟦👻🟩

      const categoryD = await Category.findById(categoryID);
      if (!categoryD) {
         return res.status(404).json({
            success: false,
            message: "Category Details Not Found",
         });
      }
      const thumbnailImg = await uploadMedia(thumbnail, process.env.FOLDER_NAME)

      //create entry of course in DB

      const newCourse = await Course.create({
         courseName,
         description,
         instructor: userId,
         learning,
         price,
         category: categoryD._id,
         thumbnail: thumbnailImg.secure_url,
         tag: tag,
         status: status,
         instructions: instructions,
      })

      //Add course id to instructor account
      await User.findByIdAndUpdate(
         { _id: userId, },
         {
            $push: {
               courses: newCourse._id,
            }
         },
         {
            new: true,
         });

      //Update category 
      const updatedCategory = await Category.findByIdAndUpdate(
         { _id: categoryD._id, },
         {
            $push: {
               courses: newCourse._id,
            }
         },
         {
            new: true,
         });;

      return res.status(200).json({
         success: true,
         message: "Course Created Succesfully.",
         data: newCourse
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Course creation failed.",
         error: error.message
      });
   }
}

exports.getAllCourses = async (req, res) => {
   try {

      const allCourses = Course.find(
         {},
         {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReview: true,
            studentsEnrolled: true,
         }
      )
         .populate("instructor").exec();

      return res.status(200).json({
         success: true,
         message: "All Courses.",
         data: allCourses,
      })

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Failed to get all courses."
      });
   }
}

exports.getCourseDetails = async (req, res) => {
   try {
      const { courseID } = req.body;

      if (!courseID) {
         return res.status(400).json({
            success: false,
            message: "course id missing."
         });
      }

      const course = await Course.findById(courseID)
         .populate({
            path: "content",
            populate: {
               path: "subSections",
            },
         })
         .populate("ratingAndReview")
         .populate("instructor")
         .populate("category")
         .populate("tag")
         .populate("studentsEnrolled").exec();

      return res.status(200).json({
         success: true,
         message: "Course detail",
         data: course,
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Failed to get course detail."
      });
   }
} 

//👻🟩🟥👻Update course is pending