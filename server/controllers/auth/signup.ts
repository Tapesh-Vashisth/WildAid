import { Request, Response } from "express";
import User from "../../models/User"
import bcrypt from "bcryptjs"
import Otp from "../../models/Otp"
import { randomUUID } from "crypto";

const signup = async (req: Request, res: Response) => {
    console.log("signup")

    const { name, email, password } = req.body
    const uuid: String = randomUUID();

    let existingUser: any
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        return res.status(400).json({message:'Database Error'})
    }

    // if an account with the provided email address already exists
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "An account with this email already exists!" })
    }

    // hashing the password using bcryptjs (synchronous) 
    const hashedPassword = bcrypt.hashSync(password, 5)

    const user = new User({
        uuid: uuid,
        name,
        email,
        password: hashedPassword,
        emailVerified: true,
        image: ""
    })

    // after all validation, creating the user in the database
    try {
        await user.save()
    } catch (err) {
        return res.status(400).json({message:'Database Error'})
    }

    return res
        .status(201)
        .json({ message: "User signed up successfully!" })
        
}

export default signup