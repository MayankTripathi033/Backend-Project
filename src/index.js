import express from "express";
import dbConnection from "./db/index.js";

const app = express();


dbConnection();


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


app.get("/",(res,req)=>{
    req.send("hello world")
})

app.listen(process.env.PORT,()=>{
    console.log(`Port is running on ${process.env.PORT}`);
})