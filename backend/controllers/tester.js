import { uploadImageToCloudinary } from "../utils/imageUploader.js"
const tester=async(req,res)=>{
try{
    const {f1}=req.files;
      const cloudUrl=await uploadImageToCloudinary(f1,"appImage");
      res.status(200)
 .json({
      sucess:true,
       data:cloudUrl,
       message:" file uploading !!"
 })
}
catch(error){
 res.status(500)
 .json({
      sucess:false,
       error:error.meassage,
       message:"prolem during file uploading !!"
 })
}
}
export default tester;