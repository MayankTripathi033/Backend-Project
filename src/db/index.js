import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnection = async() => {
    try {
        const mongodb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        mongodb? console.log(`Connection String: ${mongodb.connection.host}`) 
        : console.log("Error in your database: ")
    } catch (error) {
        console.error("Error: ",error);
        process.exit(1)
    }
}

export default dbConnection;