const express=require("express")
const addSchool=require("../Controller/school")
const listSchool=require("../Controller/getListSchool")
const router=express.Router()

router.post("/addSchool" , addSchool)
router.get("/listSchool" ,listSchool )

module.exports=router