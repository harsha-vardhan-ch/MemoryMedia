import mongoose from "mongoose";
import UserMessage from "../models/userMessage.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
	const [email, password] = await req.body();
	try {
		const existingUser = await User.findOne({ email });

		// if user does not exist
		if (!existingUser) {
			res.status(404).json({ message: "User doesn't exist." });
		}

		// comparing entered password with existing password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		// For wrong password
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Get token if entered password is correct
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
        const existingUser = await User.findOne({ email });

		// if user exists already
		if (existingUser) {
			res.status(400).json({ message: "User already exists." });
		}

        //passwords doesn't match
        if(password != confirmPassword)
        {
            res.status(400).json({ message: "Passwords doesn't match." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        // Token after creating user in DB
        const token = jwt.sign(
			{ email: newUser.email, id: newUser._id },
			"test",
			{ expiresIn: "1h" }

		);

		res.status(200).json({ result: newUser, token });
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
