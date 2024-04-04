import express from "express";
import dotenv from "dotenv";
import {app} from "./app.js"
import connectDB from "./db/index.js";
dotenv.config({
    path: './.env'
})

// const app = express();


// dbConnection()
// .then(()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log(`Port is running on ${process.env.PORT}`);
//     })
//     app.on("error",(error)=>{
//             console.log("ERROR: ", error);
//             throw error
//         })
// })
// .catch((error)=>console.log("Error: ", error))

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


// ;(async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERROR: ", error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`Port is running on ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("Error: ", error)
//     }
// })()
