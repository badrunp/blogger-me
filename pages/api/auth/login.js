import bcrypt from "bcryptjs";
import validate from "../../../lib/validation";
import User from "../../../models/User";
import jwt from 'jsonwebtoken';
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req,res){

    if(req.method != "POST") return res.status(404).json({}) 

    await dbConnect();

    const {email, password} = req.body;

    const validations = validate([
        {
            label: "email",
            required: true,
            value: email
        },
        {
            label: "password",
            required: true,
            value: password,
            min: 6
        }
    ])

    if(Object.keys(validations).length > 0) return res.status(402).json({ status: res.statusCode, validations })


    User.findOne({ email })
        .then(user => {

            if(!user){
                return res.status(403).json({
                    status: res.statusCode,
                    message: "Email atau password salah!"
                })
            }
            
            bcrypt.compare(password, user.password, (error, match)  => {
                
                if(error) return res.status(400).json({ error})
                if(!match) return res.status(403).json({ status: res.statusCode, message: "Email atau password salah!" })
                
                const {
                    _id,
                    username,
                    email,
                    title,
                    image,
                    createdAt,
                    updatedAt
                } = user;

                const token = jwt.sign({
                    _id,
                    username,
                    email,
                    title,
                    image,
                    createdAt,
                    updatedAt
                }, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                })


                return res.status(200).json({
                    status: res.statusCode,
                    message: "Login berhasil",
                    token,
                    user: {
                        _id,
                        username,
                        email,
                        createdAt,
                        updatedAt
                    }
                })
            })

        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({error})
        })

}