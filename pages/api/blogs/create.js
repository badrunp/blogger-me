import validate from "../../../lib/validation";
import dbConnect from '../../../lib/dbConnect';
import Post from "../../../models/Posts";
import jsonwebtoken from "jsonwebtoken";
import { getCookie } from "../../../lib/cookie";

export default async function handler(req, res) {

    const cookie = getCookie(req)
    if (!cookie._TOKEN) return res.status(405).json({ status: res.statusCode, error: "Kesalahan!" })
    try {
        jsonwebtoken.verify(cookie._TOKEN, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(405).json({ status: res.statusCode, error: "Kesalahan" })
    }

    if (req.method !== "POST") return res.status(404).json({})

    await dbConnect();

    const { title, category, content, summary, image } = req.body;
    const { _TOKEN } = req.cookies;


    if (!_TOKEN) return res.status(404).json({})

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

    const { _id } = jsonwebtoken.decode(_TOKEN);

    const newPost = new Post({
        title,
        category,
        summary,
        content,
        image,
        author: _id
    })

    newPost.save()
        .then(post => {

            if (post) {
                return res.status(200).json({
                    status: res.statusCode,
                    message: "Berhasil membuat post",
                    post
                })
            }

        })
        .catch(error => {

            console.log(error);
            return res.status(400).json({ status: res.statusCode, error })

        })


}