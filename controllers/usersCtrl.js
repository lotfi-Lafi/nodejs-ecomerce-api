import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../model/User.js';
import generateToken from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';


// Register user
// @route: POST /api/v1/users/register
// Private/Admin
export const registerUserCtrl = asyncHandler(async (req, res) => {

    const { fullname, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        // throw
        throw new Error('User already exists !');
    }

    // hash password with package "bcryptjs"
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status: 'success',
        message: 'User registered Successfully !',
        data: user
    });
});

// Login user
// @route: POST /api/v1/users/login
// Public
export const loginUserCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // find the user in DB by email only
    const userFound = await User.findOne({
        email,
    });
    // userFound?.password ====> userFound && userFound.password
    if (userFound && await bcrypt.compare(password, userFound?.password)) {
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(),
        });
    } else {
        throw new Error('Invalid login');
    } 
});


// Gey user profile
// @route: POST /api/v1/users/profile
// Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {

    // get token from header
    const token = getTokenFromHeader(req);

    res.json({
        message: 'Welcome profile page',
    });
});