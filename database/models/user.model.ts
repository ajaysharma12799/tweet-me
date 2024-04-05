import mongoose, { Schema } from "mongoose";
import { IUSERINTERFACE } from "../interfaces/user.interface";

const userSchema = new Schema<IUSERINTERFACE>({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is Required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is Required"],
    },
    password: {
        type: String,
        unique: true,
        required: [true, "Password is Required"],
    }
}, {
    timestamps: true,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
