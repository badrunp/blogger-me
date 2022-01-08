import jsonwebtoken from 'jsonwebtoken';
import { getCookie } from '../../../lib/cookie';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Posts';

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

    const { id } = req.body;
    
    if (id) {

        try {
            const post = await Post.findOne({ _id: id })
            if (!post) {
                return res.status(404).json({})
            }

            const deletePost = await Post.findOneAndDelete({ _id: id })

            return res.status(200).json({
                status: res.statusCode,
                post: deletePost,
                message: `Berhasil menghapus post`
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