import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ajaysharma12799:root@cluster0.nrclpox.mongodb.net/flutter-fullstack-course");
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;