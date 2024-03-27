import express from "express";
import dbConnection from "./db/index.js";

const app = express();


dbConnection()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Port is running on ${process.env.PORT}`);
    })
    app.on("error",(error)=>{
            console.log("ERROR: ", error);
            throw error
        })
})
.catch((error)=>console.log("Error: ", error))


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
