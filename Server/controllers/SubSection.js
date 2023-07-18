const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadMedia } = require("../utils/mediaUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
   try {
      //get data
      const { title, description, timeDuration, sectionID } = req.body;
      const file = req.files.file;

      if (!title || !description || !timeDuration || !file || !sectionID) {
         return res.status(400).json({
            success: false,
            message: "Fill in all the details."
         });
      }

      //upload video file to cloudinary
      const video = await uploadMedia(file, process.env.FOLDER_NAME);

      const newSubSection = await SubSection.create({
         title, //title:title ? 🟩🟩,
         description,
         timeDuration,
         videoUrl:video.secure_url,
      });

      const updatedSection = await Section.findByIdAndUpdate(sectionID ,
         {
            $push: {
               subSections: newSubSection._id,
            }
         }, { new: true }
      )
      .populate("subSections");
         console.log(updatedSection);

      return res.status(200).json({
         success: true,
         message: "SubSection created Succesfully.",
         subsection: newSubSection,
         section: updatedSection,
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "SubSection creation failed."
      });
   }
}

//update SubSection
exports.updateSubSection = async (req, res) => {
   try {
      //get data
      const { title, description, timeDuration, subSectionID, updateVideo } = req.body;
      const file = req.files.file;

      if (!title || !description || !timeDuration || (!file && updateVideo==true) || !subSectionID) {
         return res.status(400).json({
            success: false,
            message: "Fill in all the details."
         });
      }

      if (updateVideo==true) {
         const video = await uploadMedia(file, process.env.FOLDER_NAME);


         const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionID,{
            title, //title:title ? 🟩🟩,
            description,
            timeDuration,
            videoUrl: video.secure_url,
         },{new:true});
      }

      else {
         const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionID,{
            title, //title:title ? 🟩🟩,
            description,
            timeDuration,
         },{new:true});
      }
      //populate🟥🟩

      return res.status(200).json({
         success: true,
         message: "SubSection updated Succesfully.",
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "SubSection updation failed."
      });
   }
}

//delete SubSection
exports.deleteSubSection = async (req, res) => {
   try {

      //get data
      const { SubSectionID } = req.body;

      if (!SubSectionID) {
         return res.status(400).json({
            success: false,
            message: "Section ID missing."
         });
      }

      //delete section

      SubSection.findByIdAndDelete(SubSectionID);
      //🟦🟥🟩🟦🟥🟩 is it necessery to delete SubSection id from the Section => You can leave the document as is, even when the referenced person document is deleted. Mongodb clears references which point to non-existing documents, this doesn't happen immediately after deleting the referenced document. Instead, when you perform action on the document, e.g., update. Moreover, even if you query the database before the references are cleared, the return is empty, instead of null value.

      return res.status(200).json({
         success: true,
         message: "SUbSection deleted Succesfully.",
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "SUbSection delation failed."
      });
   }
}