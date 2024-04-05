import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../database/models/user.model";
import { ILOGINUSERINTERFACE, IUSERINTERFACE } from "../database/interfaces/user.interface";

const createUser = async (req: Request, res: Response) => {
    try {
        const reqBody: IUSERINTERFACE = req.body

        // 1. Check If User is Present in DB
        const user = await UserModel.findOne({ email: reqBody.email });

        if (user) {
            return res.status(200).json({
                statue: "Failed",
                error: "User Already Exist"
            });
        }

        // 2. Create New User
        const newUser = new UserModel({
            username: reqBody.username,
            email: reqBody.email,
        });

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password.toString(), salt);
        newUser.password = hashedPassword.toString();

        // 4. Create JWT Token
        const jwtToken = jwt.sign({
            id: newUser?._id
        }, "Tweet-Me");

        // 5. Save User
        await newUser.save();

        // 6. Throw Token on Client Side
        res.status(200).json({
            statue: "Success",
            data: jwtToken,
            msg: "User Created Successfully"
        });
    } catch (error: any) {
        res.status(500).json({
            status: "Failed",
            error: error?.message
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const reqBody: ILOGINUSERINTERFACE = req.body
        const { email, password } = reqBody;

        // 1. Check If User is Present in DB
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(200).json({
                statue: "Failed",
                error: "User Does't Exist"
            });
        }

        // 2. Compare User Password
        const isMatch = await bcrypt.compare(password.toString(), user?.password.toString());

        if (!isMatch) {
            return res.status(200).json({
                statue: "Failed",
                error: "Password Does't Match"
            });
        }

        // 4. Create JWT Token
        const jwtToken = jwt.sign({
            id: user?._id
        }, "Tweet-Me");

        // 6. Throw Token on Client Side
        res.status(200).json({
            statue: "Success",
            data: jwtToken,
            msg: "LoggedIn Successfully"
        });
    } catch (error: any) {
        res.status(500).json({
            status: "Failed",
            error: error?.message
        });
    }
}

const getUser = () => {

}

const deleteUser = () => {

}

export { createUser, loginUser };
