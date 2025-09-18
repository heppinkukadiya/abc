const { PrismaClient } = require('@prisma/client');
const { mailSender } = require("../Utils/mailSender");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();


const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
};

exports.signup = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            company_name,
            email,
            mobileNo,
            mobileCode,
            address,
            city,
            state,
            country,
            pincode,
            gstin
        } = req.body;

        if (!first_name || !last_name || !company_name || !email || !mobileNo || !mobileCode || !address || !city || !state || !country || !pincode) {
            return res.status(406).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user1 = await prisma.User.findUnique({ where: { email } });

        if (!user1) {
            const user = await prisma.User.create({
                data: {
                    first_name,
                    last_name,
                    company_name,
                    email,
                    mobileNo,
                    mobileCode,
                    address,
                    city,
                    state,
                    country,
                    pincode,
                    gstin
                }
            });
        }

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });

    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    const { email } = req.body;

    const user = await prisma.User.findUnique({ where: { email } });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User does not exist"
        });
    }

    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.Otp.upsert({
        where: { email },
        update: { otp, otpExpires },
        create: { email, otp, otpExpires },
    });

    await mailSender(email, "Your OTP Code", `Your OTP is: ${otp}`);

    return res.status(200).json({
        success: true,
        message: "OTP sent to email",
    });
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const record = await prisma.Otp.findUnique({ where: { email } });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "OTP not found"
            });
        }

        if (record.otp !== otp) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (record.otpExpires < new Date()) {
            return res.status(410).json({
                success: false,
                message: "OTP has expired"
            });
        }

        const payload = { email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' });

        await prisma.Otp.delete({ where: { email } });

        return res
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                success: true,
                message: "OTP verified successfully",
                token
            });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error during OTP verification"
        });
    }
};

exports.administrator = async (req, res) => {

    try {
        const { email, password } = req.body;

        const role = "ADMIN";



        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const payload = { role };
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            return res
                .cookie("token", token, cookieOptions)
                .status(200)
                .json({
                    success: true,
                    message: "admin",
                    token
                });
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect credentials",
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Login Failed",
        });
    }
};
