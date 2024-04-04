import {asynchandler} from "../utils/asynchandler.js"

const registerUser = asynchandler(async(req,res)=>{
    res.status(208).json({message: "ok"})
})

const registeradmin = asynchandler(async(req,res)=>{
    res.status(200).json({message: "admin is created"})
})

const loginadmin = asynchandler(async(req,res)=>{
    res.status(200).json({message: "admin has logined"})
})

export {registerUser, registeradmin, loginadmin}

