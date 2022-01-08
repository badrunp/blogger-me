import jsonwebtoken from "jsonwebtoken";
import { getCookie } from "../../../lib/cookie";
import dbConnect from "../../../lib/dbConnect";
import User from '../../../models/User'

export default async function handler(req, res) {

    const cookie = getCookie(req)
    if (!cookie._TOKEN) return res.status(405).json({ status: res.statusCode, error: "Kesalahan!" })
    try {
        jsonwebtoken.verify(cookie._TOKEN, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(405).json({ status: res.statusCode, error: "Kesalahan" })
    }

    if (req.method != "POST") return res.status(404);

    await dbConnect();

    const { id } = req.query

    if (id) {

        try {

            const { image: newImage } = req.body;

            const user = await User.findOneAndUpdate({ _id: id }, {
                $set: {
                    image: newImage
                }
            }, { new: true })

            const {
                _id,
                username,
                email,
                title,
                image,
                createdAt,
                updatedAt
            } = user;

            const token = jsonwebtoken.sign({
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
                message: 'Ubah photo profile berhasil',
                image: user.image,
                token
            })

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                status: res.statusCode,
                error
            })
        }

    }

    return res.status(404).json({})

}