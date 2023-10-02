const Course = require("../models/Course")
const Category = require("../models/Category")
const { uploadMedia } = require("../utils/mediaUploader")
const User = require("../models/User")

exports.createCourse = async (req, res) => {
  try {
    //get data
    //  console.log(req);
    let {
      courseName,
      description,
      learning,
      price,
      categoryID,
      tag,
      instructions,
    } = req.body
    let { status } = req.body
    const { thumbnail } = req.files

    //validation
    if (
      !courseName ||
      !description ||
      !learning ||
      !price ||
      !categoryID ||
      !thumbnail ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "Fill in all the details.",
      })
    }

    if (!status || status === undefined) {
      status = "Draft"
    }

    const userId = req.user.id

    //instruction and problem in Tags 👻🟥👻🟦👻🟩

    const categoryD = await Category.findById(categoryID)
    if (!categoryD) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
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
      tag: JSON.parse(tag), // (tag),
      status: status,
      instructions: JSON.parse(instructions),
    })

    //Add course id to instructor account
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    )

    //Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryD._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    )

    return res.status(200).json({
      success: true,
      message: "Course Created Succesfully.",
      data: newCourse,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Course creation failed.",
      error: error.message,
    })
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
      .populate("instructor")
      .exec()

    return res.status(200).json({
      success: true,
      message: "All Courses.",
      data: allCourses,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to get all courses.",
    })
  }
}

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseID } = req.body

    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "course id missing.",
      })
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
      .populate("studentsEnrolled")
      .exec()

    return res.status(200).json({
      success: true,
      message: "Course detail",
      data: course,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get course detail.",
    })
  }
}

//👻🟩🟥👻Update course is pending
exports.updateCourse = async (req, res) => {
  try {
    //get data
    let {
      courseID,
      courseName = null,
      description = null,
      learning = null,
      price = null,
      categoryID = null,
      tag = null,
      instructions = null,
    } = req.body
    if (!courseID) {
      return res.status(404).json({
        success: false,
        message: "Add course Id.",
      })
    }
    let { status } = req.body
    let thumbnail = null
    if (req.files !== null) {
      thumbnail = req.files.thumbnail
    }
    if (!status || status === undefined) {
      status = "Draft"
    }

    const userId = req.user.id
    //if we have to update category also then delete it from previous and then add this to new
    const course = await Course.findById(courseID)
    if (userId !== course.instructor.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can't edit this course.",
      })
    }

    if (categoryID) {
      var categoryD = await Category.findById(categoryID)
      if (!categoryD) {
        return res.status(404).json({
          success: false,
          message: "New Category Details Not Found",
        })
      }
      //delete from old category
      await Category.findByIdAndUpdate(course.category, {
        $pull: {
          courses: courseID,
        },
      })

      //add to new category
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryID,
        {
          $push: {
            courses: courseID,
          },
        },
        {
          new: true,
        }
      )
    }

    if (thumbnail != null) {
      var thumbnailImg = await uploadMedia(thumbnail, process.env.FOLDER_NAME)
    }
    //create entry of course in DB
    const update = {}
    if (courseName) update.courseName = courseName
    if (description) update.description = description
    if (learning) update.learning = learning
    if (price) update.price = price
    if (categoryID) update.category = categoryID
    if (thumbnail) update.thumbnail = thumbnailImg.secure_url
    if (tag) update.tag = JSON.parse(tag)
    if (status) update.status = status
    if (instructions) update.instructions = JSON.parse(instructions)

    const updatedCourse = await Course.findByIdAndUpdate(courseID, update)

    return res.status(200).json({
      success: true,
      message: "Course Created Succesfully.",
      data: updatedCourse,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Course updation failed.",
      error: error.message,
    })
  }
}
