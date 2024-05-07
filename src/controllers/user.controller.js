import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadfileToCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asynchandler(async(req,res)=>{
    /*We need username,password,email from frontend.
    -> We need assurance that data is posting or not.
    -> username should be string and should be all lowercase
    -> password should be alphanumeric and .test should check the validation 
    with the help of regex.
    -> email should pass .test with the help of regex.
    -> avatar image should be less than 100kb.
    -> coverimage should be less than 1mb.
    -> check user is regsitered or not
    -> upload images to cloudinary
    -> check images have been uploaded to clodinary
    -> remove password and refresh token field from response
    -> check for user creation
    -> return response or not return error
    */
    try {
        const {
            username, 
            email, 
            fullName, 
            password, } = req.body();
            console.log("email :: ",email);
            if
            (
                [fullName, email, username, password].some(value=> value?.trim() === "")
            )
            {
                throw new ApiError(400, "All fields are required")
            }
            const existedUser = User.findOne({
                $or: [{username}, {email}]
            })
            if(existedUser){ 
                throw new ApiError(409, "User with email is existed")
            }
            const avatarLocalPath = req.files?.avatar[0]?.path;
            const coverImageLocalPath = req.files?.coverImage[0]?.path;
            if(!avatarLocalPath){
                throw new ApiError(400, 'Avatar is Required');
            }
            const avatar = await uploadfileToCloudinary(avatarLocalPath);
            const coverImage = await uploadfileToCloudinary(coverImageLocalPath);
            if(!avatar){
                throw new ApiError(400, 'Avatar is Required')
            }

            const user = await User.create({
                fullName,
                avatar: avatar.url,
                coverImage: coverImage?.url || "",
                email,
                password,
                username: username.toLowerCase()
            })
            const createdUser = await User.findById(user._id).select(
                "-password -refreshToken"
            );
            if(createdUser){
                throw new ApiError(500, 'Something went wrong while registering the user')
            }

            return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"))


    } catch (error) {
        console.error("Error :: RegisterUser:: internalserver", error);
        res.status(400).json({
            message: "user already exist",
            success:  false
        })
    }
    
})

const registeradmin = asynchandler(async(req,res)=>{
    res.status(200).json({message: "admin is created"})
})

const loginadmin = asynchandler(async(req,res)=>{
    res.status(200).json({message: "admin has logined"})
})

export {registerUser, registeradmin, loginadmin}

