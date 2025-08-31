import mongoose from "mongoose";


// TODO : test why this not working while using const .env variables
// const MONGO_URL = process.env.MONGO_URI


const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            dbName : 'matrix'
        });
        console.log(`DataBase is connected at URL : ${connection.connection.host} and database is `)
    } catch (error) {
        console.log(`connection to database failed! ${error}`)
    }
}

export default connectDB