import mongoose from "mongoose";

//function helps to connect database
const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/Naksh_Jewels`)
    } catch (error) {
        console.error(error.message);
    }
}

export default connectDB;