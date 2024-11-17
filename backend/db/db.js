import mongoose from "mongoose"

const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DB_URL)

        console.log(`Database connected`);
        
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}


export default connectDb