import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Posts';
import validate from "../../../../lib/validation";
import { getCookie } from '../../../../lib/cookie';
import jsonwebtoken from 'jsonwebtoken';

export default async function handler(req, res) {

    const cookie = getCookie(req)
    if (!cookie._TOKEN) return res.status(405).json({status: res.statusCode, error: "Kesalahan!" })
    try {
        jsonwebtoken.verify(cookie._TOKEN, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(405).json({ status: res.statusCode, error: "Kesalahan" })
    }

    if (req.method != "POST") return res.status(404).json({})

    await dbConnect();

    const { id } = req.query;

    const { title, category, content, summary, image } = req.body;

    const validations = validate([
        {
            label: "title",
            required: true,
            value: title
        },
        {
            label: "category",
            required: true,
            value: category
        },
        {
            label: "summary",
            required: true,
            value: summary
        },
        {
            label: "content",
            required: true,
            value: content
        }
    ])

    if (Object.keys(validations).length > 0) return res.status(402).json({ status: res.statusCode, validations });

    try {

        if (id) {
            const post = await Post.findOne({ _id: id })
            if (post) {
                const newPost = await Post.findOneAndUpdate({ _id: id }, {
                    $set: {
                        title,
                        category,
                        content,
                        summary,
                        image
                    }
                }, { new: true })
                return res.status(200).json({
                    status: res.statusCode,
                    message: 'Berhasil mengubah post',
                    post: newPost
                })
            }
        }

        throw new "Vailed updated post!";


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: res.statusCode,
            error
        })
    }

}